<script lang="ts" setup>
import type { SelectProps, TableProps } from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import type { DefaultOptionType } from "ant-design-vue/es/select";
import type { Dayjs } from "dayjs";
import { collection, doc, query, where } from "firebase/firestore";
import {
  ECapitalizationFrequency,
  ECurrency,
  ELoanStatus,
  ETipoBono,
  ETipoGracia,
  ETipoTasa,
} from "~/enums";
import type { ICreditConfiguration } from "~/models/creditConfiguration";
import type { ILoan } from "~/models/loan";

definePageMeta({
  name: "NewLoan",
});

// const db = useFirestore();
const router = useRouter();
const route = useRoute();
const dayjs = useDayjs();
const nAnnual = 12;
const m = ref<number>(1);

const formRef = ref();
const formState = reactive<Partial<ILoan>>({
  fechaSolicitud: dayjs(),
  status: ELoanStatus.pending,
  currency: ECurrency.soles,
  tipoTasa: ETipoTasa.efectiva,
  tipoGracia: ETipoGracia.none,
  tipoBono: ETipoBono.ninguno,
});

watchEffect(() => {
  if (formState.tipoTasa === ETipoTasa.nominal) {
    formState.tasaEfectiva =
      Math.pow(1 + (formState.tasaNominal ?? 0) / 100 / m.value, nAnnual) - 1;
  }
});

watchEffect(() => {
  if (formState.tipoTasa === ETipoTasa.nominal) {
    m.value =
      formState.capitalizacion === ECapitalizationFrequency.mensual
        ? 12
        : formState.capitalizacion === ECapitalizationFrequency.bimestral
        ? 6
        : formState.capitalizacion === ECapitalizationFrequency.trimestral
        ? 4
        : formState.capitalizacion === ECapitalizationFrequency.semestral
        ? 2
        : formState.capitalizacion === ECapitalizationFrequency.anual
        ? 1
        : 1;
  }
});

// // -------------cronograma
// // van_mivivienda.ts
// type Params = {
//   P: number; // monto préstamo
//   tna?: number; // tasa nominal anual (ej: 10.20 -> 10.2)
//   useTEA?: boolean; // si la tasa es efectiva anual en lugar de nominal (no usado aquí)
//   plazoMeses: number;
//   tasaDesgMensual: number; // e.g. 0.00035
//   tasaBienMensual: number; // e.g. 0.00045
//   costosIniciales: number; // suma de tasación + notariales + registrales
//   itfFactor?: number; // 0.00005
//   discountAnnual: number; // tasa de descuento anual para VAN (ej: 0.10)
// };

// function calcularCronogramaYVAN(params: Params) {
//   const {
//     P,
//     tna = 10.2,
//     plazoMeses,
//     tasaDesgMensual,
//     tasaBienMensual,
//     costosIniciales,
//     itfFactor = 0.00005,
//     discountAnnual,
//   } = params;

//   const i = tna / 100 / 12; // tasa periódica usada para cuota
//   const n = plazoMeses;

//   // cuota francesa
//   const onePlusI = Math.pow(1 + i, n);
//   const cuota = P * (i / (1 - Math.pow(1 + i, -n)));

//   // tasa de descuento mensual
//   const k = Math.pow(1 + discountAnnual, 1 / 12) - 1;

//   // cashflows: t0 = P - costosIniciales (cliente recibe neto)
//   const cashflows: number[] = [];
//   cashflows.push(P - costosIniciales);

//   let saldo = P;
//   for (let t = 1; t <= n; t++) {
//     const interes = saldo * i;
//     const amort = cuota - interes;
//     const segDesg = saldo * tasaDesgMensual;
//     const segBien = saldo * tasaBienMensual;
//     const itf = cuota * itfFactor;
//     const totalPago = cuota + segDesg + segBien + itf;
//     // desde la perspectiva del cliente → pago negativo
//     cashflows.push(-totalPago);
//     saldo = saldo - amort;
//   }

//   // calcular VAN con k mensual
//   let van = 0;
//   for (let t = 0; t < cashflows.length; t++) {
//     van += cashflows[t] / Math.pow(1 + k, t);
//   }

//   return {
//     cuota: Number(cuota.toFixed(2)),
//     cashflows,
//     van: Number(van.toFixed(2)),
//     discountMonthly: Number(k.toFixed(8)),
//   };
// }

// // example
// const res = calcularCronogramaYVAN({
//   P: 150000,
//   tna: 10.2,
//   plazoMeses: 240,
//   tasaDesgMensual: 0.00035,
//   tasaBienMensual: 0.00045,
//   costosIniciales: 450 + 1800 + 500, // tal como en el proyecto
//   itfFactor: 0.00005,
//   discountAnnual: 0.1,
// });
// console.log("Cuota francesa (S/):", res.cuota);
// console.log("Tasa descuento mensual:", res.discountMonthly);
// console.log("VAN (S/):", res.van);
// // -----------------------

const rules: Record<string, Rule[]> = {
  // date: [
  //   {
  //     required: true,
  //     message: "Ingresar fecha de entrega!",
  //   },
  // ],
  // customer: [
  //   {
  //     required: true,
  //     message: "Ingresar cliente!",
  //   },
  // ],
  // origin: [
  //   {
  //     required: true,
  //     message: "Ingresar origen de pedido!",
  //   },
  // ],
};

// const columns: TableProps["columns"] = [
//   {
//     title: "FECHA DE LOTE",
//     key: "dateBatch",
//     dataIndex: "dateBatch",
//     width: "120px",
//     align: "center",
//     customRender: ({ record }) => {
//       return dayjs(record.dateBatch).format("DD/MM/YYYY");
//     },
//   },
//   {
//     title: "PRODUCTO",
//     key: "product",
//     dataIndex: "product",
//   },
//   {
//     title: "CANTIDAD",
//     dataIndex: "quantity",
//     // align: 'center',
//     width: "120px",
//   },
//   {
//     title: "PRECIO",
//     dataIndex: "price",
//     align: "right",
//     width: "130px",
//     customRender: ({ value }) => {
//       return currency(value, "");
//     },
//   },
//   {
//     title: "TOTAL",
//     dataIndex: "total",
//     align: "right",
//     width: "150px",
//   },
//   {
//     title: "CAMBIO",
//     dataIndex: "changeProduct",
//     align: "center",
//     width: "80px",
//   },
//   {
//     title: "",
//     dataIndex: "operation",
//     align: "center",
//     width: "120px",
//   },
// ];

// const details: Ref<any[]> = ref([]);
// const editableData = reactive<Record<string, any>>({});

// const edit = (id: string) => {
//   editableData[id] = _CloneDeep(
//     details.value.filter((item) => id === item.id)[0]
//   );
// };

// const save = (id: string) => {
//   if (editableData[id].isChange === true) {
//     editableData[id].price = 0;
//   }

//   Object.assign(
//     details.value.filter((item) => id === item.id)[0],
//     editableData[id]
//   );
//   delete editableData[id];
// };

// const onDelete = (codeBatch: string, id: string) => {
//   details.value = details.value.filter(
//     (item: IMovement) =>
//       !(item.codeBatch === codeBatch && item.product.id === id)
//   );
// };

// const handleSelected = (batch: any) => {
//   details.value.push({
//     id: batch.id,
//     codeBatch: batch.codeBatch,
//     dateBatch: batch.dateBatch,
//     product: batch.product,
//     quantityBatch: batch.quantity,
//     quantity: batch.quantity,
//     isSale: batch.isSale,
//     price: handleCustomPrice(batch.product.id),
//   } as IMovement);
// };

// const handleSelectedCustomer = (val?: ICustomer) => {
//   formState.address = val ? val.address : undefined;
//   formState.reference = val ? val.reference : undefined;
//   formState.coordenada = val ? val.coordenada : undefined;
// };

// const handleOpenBatch = () => {
//   open.value = true;

//   if (formState.origin === "store") {
//     batches.value = undefined;
//   } else {
//     batches.value =
//       distributions.value
//         .find((item) => item.id === formState.origin)
//         ?.movements.filter((item) => item.product.type === ETypeProduct.product)
//         .filter(
//           (item) =>
//             !details.value.find(
//               (y) =>
//                 y.codeBatch === item.codeBatch &&
//                 y.product.id === item.product.id
//             )
//         ) ?? [];
//   }
// };

// const handleSubmit = () => {
//   if (details.value.length < 1) return;

//   formRef.value
//     .validate()
//     .then(async () => {
//       try {
//         loading.value = true;

//         if (voucher.value) {
//           await update(
//             db,
//             formState.id as string,
//             _CloneDeep(formState),
//             _CloneDeep(details.value)
//           );
//         } else {
//           await addVoucher(
//             db,
//             _CloneDeep(formState),
//             _CloneDeep(details.value),
//             []
//           );
//         }

//         notificationSuccess(`Pedido ${voucher.value ? "Editado" : "agregado"}`);
//         router.push({ name: "Loans" });
//       } catch (error: any) {
//         modalError(error.message);
//       } finally {
//         loading.value = false;
//       }
//     })
//     .catch((error: any) => {
//       console.log("error", error);
//     });
// };

// const handleCustomPrice = (productId: string) => {
//   const pricesByProduct = prices.value.find(
//     (item) => item.product.id === productId
//   );
//   return pricesByProduct?.priceRecharge;
//   // return pricesByProduct?.priceRecharge ?? products.value.filter((item) => item.id === productId)[0].rechargePlantPrice
// };

// // calc total
// watchEffect(() => {
//   if (details.value.length > 0) {
//     const temp =
//       (details.value.reduce((prev: number, item: IMovement) => {
//         return prev + item.quantity * item.price;
//       }, 0) *
//         100) /
//       100;

//     formState.total = Math.round(temp * 100) / 100;
//   } else {
//     formState.total = 0;
//   }
// });

// watchEffect(() => {
//   if (voucher.value?.id) {
//     Object.assign(formState, {
//       ...voucher.value,
//       date: dayjs(voucher.value.date as Date),
//     });

//     details.value = (details2.value as IMovement[]).map((x) => {
//       return { ...x, dateBatch: dayjs(x.dateBatch as Date) };
//     });
//   }
// });

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
</script>

<template>
  <div>
    <a-page-header
      class="bg-white shadow-md"
      title="Simular Crédito"
      @back="() => router.push({ name: 'Loans' })"
    />

    <br />

    <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
      <a-card title="1. Identificación" class="w-[700px] shadow-md">
        <!-- <a-form-item label="Fechad de pedido" name="date">
          <a-date-picker
            v-model:value="formState.date as Dayjs"
            class="w-full"
            show-time
            format="DD/MM/YYYY HH:mm:ss"
          />
        </a-form-item> -->

        <a-form-item label="Cliente" name="cliente">
          <SelectCustomer v-model="formState.cliente" />
        </a-form-item>

        <a-form-item label="Inmueble" name="inmueble">
          <SelectProperty v-model="formState.inmueble" />
        </a-form-item>

        <a-form-item label="Moneda" name="currency">
          <a-select
            ref="select"
            v-model:value="formState.currency"
            style="width: 120px"
          >
            <a-select-option :value="ECurrency.soles">Soles</a-select-option>
            <a-select-option :value="ECurrency.dollars">Dolar</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Entidad Financiera" name="entidadFinanciera">
          <SelectBank v-model="formState.entidadFinanciera" />
        </a-form-item>
      </a-card>

      <br />

      <a-card title="2. Parámetros del crédito" class="w-[700px] shadow-md">
        <a-form-item label="Monto del crédito" name="montoPrestamo">
          <a-input-number
            v-model:value="formState.montoPrestamo"
          ></a-input-number>
        </a-form-item>

        <a-form-item label="Plazo meses" name="plazoMeses">
          <a-input-number v-model:value="formState.plazoMeses"></a-input-number>
        </a-form-item>

        <a-form-item label="Tipo de tasa" name="tipoTasa">
          <a-select
            ref="select"
            v-model:value="formState.tipoTasa"
            style="width: 120px"
          >
            <a-select-option :value="ETipoTasa.efectiva"
              >Efectiva</a-select-option
            >
            <a-select-option :value="ETipoTasa.nominal"
              >Nominal</a-select-option
            >
          </a-select>
        </a-form-item>

        <a-form-item
          v-if="formState.tipoTasa === ETipoTasa.nominal"
          label="Capitalización"
          name="tipoGracia"
        >
          <a-select
            ref="select"
            v-model:value="formState.capitalizacion"
            style="width: 120px"
          >
            <a-select-option :value="ECapitalizationFrequency.mensual"
              >Mensual</a-select-option
            >
            <a-select-option :value="ECapitalizationFrequency.bimestral"
              >Bimestral</a-select-option
            >
            <a-select-option :value="ECapitalizationFrequency.trimestral"
              >Trimestral</a-select-option
            >
            <a-select-option :value="ECapitalizationFrequency.semestral"
              >Semestral</a-select-option
            >
            <a-select-option :value="ECapitalizationFrequency.anual"
              >Anual</a-select-option
            >
          </a-select>
        </a-form-item>

        <template v-if="formState.tipoTasa === ETipoTasa.nominal">
          <a-form-item label="Valor de tasa (%)" name="valorTasa">
            <a-input-number
              v-model:value="formState.tasaNominal"
            ></a-input-number>
          </a-form-item>

          <a-form-item label="Valor TEA (%)">
            <strong
              >{{ ((formState.tasaEfectiva ?? 0) * 100).toFixed(4) }} %</strong
            >
          </a-form-item>
        </template>

        <a-form-item v-else label="Valor TEA (%)" name="valorTasa">
          <a-input-number
            v-model:value="formState.tasaEfectiva"
          ></a-input-number>
        </a-form-item>

        <a-form-item label="Tipo de gracia" name="tipoGracia">
          <a-select
            ref="select"
            v-model:value="formState.tipoGracia"
            style="width: 120px"
          >
            <a-select-option :value="ETipoGracia.none">Ninguna</a-select-option>
            <a-select-option :value="ETipoGracia.parcial"
              >Parcial</a-select-option
            >
            <a-select-option :value="ETipoGracia.total">Total</a-select-option>
          </a-select>
        </a-form-item>
      </a-card>

      <br />

      <a-card title="3. Costos iniciales y seguros" class="w-[700px] shadow-md">
        <a-form-item label="Costo de tasación" name="costoTasacion">
          <a-input-number
            v-model:value="formState.costoTasacion"
          ></a-input-number>
        </a-form-item>

        <a-form-item label="Gastos notariales" name="costoNotarial">
          <a-input-number
            v-model:value="formState.costoNotarial"
          ></a-input-number>
        </a-form-item>

        <a-form-item label="Gastos registrales" name="montoPrestamo">
          <a-input-number
            v-model:value="formState.costoRegistral"
          ></a-input-number>
        </a-form-item>

        <a-form-item label="Seguro de desgravamen (%)" name="montoPrestamo">
          <a-input-number
            v-model:value="formState.tasaSeguroDesgravamen"
          ></a-input-number>
        </a-form-item>

        <a-form-item label="Seguro del bien (%)" name="montoPrestamo">
          <a-input-number
            v-model:value="formState.tasaSeguroBien"
          ></a-input-number>
        </a-form-item>

        <a-form-item label="Aplica Bono" name="tipoBono">
          <a-select
            ref="select"
            v-model:value="formState.tipoBono"
            style="width: 120px"
          >
            <a-select-option :value="ETipoBono.ninguno"
              >Ninguno</a-select-option
            >
            <a-select-option :value="ETipoBono.techoProprio"
              >Techo Propio</a-select-option
            >
          </a-select>
        </a-form-item>

        <a-form-item
          v-if="formState.tipoBono !== ETipoBono.ninguno"
          label="Monto del bono"
          name="montoBono"
        >
          <a-input-number v-model:value="formState.montoBono"></a-input-number>
        </a-form-item>
      </a-card>

      <br />

      <a-card title="4. Ajustes adicionales" class="w-[700px] shadow-md">
        <a-form-item label="Frecuencia de pago">
          <strong>Mensual</strong>
        </a-form-item>
      </a-card>

      <br />

      <a-card title="5. Resumen" class="w-[700px] shadow-md">
        <a-form-item label="VAN">
          <strong>-</strong>
        </a-form-item>

        <a-form-item label="TIR">
          <strong>-</strong>
        </a-form-item>
      </a-card>

      <br />

      <a-card title="6. Cronograma Método Frances" class="shadow-md"> </a-card>
    </a-form>
  </div>
</template>
