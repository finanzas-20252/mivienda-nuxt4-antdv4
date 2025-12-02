<script lang="ts" setup>
import type { Rule } from "ant-design-vue/es/form";
import type { ICustomer } from "~/models/customer";
// import type { ICustomer } from '~/models/customer'

interface Props {
  open: boolean;
  // customer?: ICustomer
}

const props = defineProps<Props>();

const emit = defineEmits<{
  onClose: [];
}>();

const customerId = ref<string>();

// const db = useFirestore()
// const envaseRef = collection(db, 'categoryCustomers')
// const { data: categoryCustomers } = useCollection(envaseRef, {
//   ssrKey: 'categoryCustomers',
// })

// const { addCustomer, updateCustomer } = useCrudCustomers()

const cities = ["Lima"];
const districts = {
  Lima: [
    "Ancón",
    "Ate",
    "Barranco",
    "Breña",
    "Carabayllo",
    "Cercado De Lima",
    "Chaclacayo",
    "Chorrillos",
    "Cieneguilla",
    "Comas",
    "El Agustino",
    "Independencia",
    "Jesús María",
    "La Molina",
    "La Victoria",
    "Lima",
    "Lince",
    "Los Olivos",
    "Lurigancho",
    "Lurín",
    "Magdalena del Mar",
    "Miraflores",
    "Pachacamac",
    "Parque Industrial",
    "Pucusana",
    "Pueblo Libre",
    "Puente Piedra",
    "Punta Hermosa",
    "Punta Negra",
    "Rímac",
    "Salamanca",
    "San Bartolo",
    "San Borja",
    "San Isidro",
    "San Juan de Lurigancho",
    "San Juan de Miraflores",
    "San Luis",
    "San Martín de Porres",
    "San Miguel",
    "Santa Anita",
    "Santa María del Mar",
    "Santa Rosa",
    "Santiago de Surco",
    "Surquillo",
    "Villa El Salvador",
    "Villa María del Triunfo",
  ],
};

const loading = ref(false);
const formRef = ref();
const formState = reactive<Partial<ICustomer>>({});

onMounted(() => {
  // if (props.customer) {
  //   Object.assign(formState, props.customer);
  //   customerId.value = props.customer.id;
  // }
});

const rules: Record<string, Rule[]> = {
  identity: [
    {
      required: true,
      message: "Ingresar DNI/RUC!",
    },
  ],
  name: [
    {
      required: true,
      message: "Ingresar nombre!",
    },
  ],
  monthlyIncome: [
    {
      required: true,
      message: "Ingresar ingreso mensual!",
    },
  ],
};

const handleOk = () => {
  formRef.value
    .validate()
    .then(async () => {
      // const db = useFirestore()
      // try {
      //   loading.value = true
      //   if (props.customer) {
      //     await updateCustomer(db, props.customer.id, _CloneDeep(formState))
      //   } else {
      //     await addCustomer(db, _CloneDeep(formState))
      //   }
      //   notificationSuccess(`Cliente ${props.customer ? 'editado' : 'creado'}`)
      //   emit('onClose')
      // } catch (error: any) {
      //   modalError(error.message)
      // } finally {
      //   loading.value = false
      // }
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};

const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().includes(input.toLowerCase());
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
</script>

<template>
  <a-modal
    :open="open"
    :mask-closable="false"
    :confirm-loading="loading"
    @cancel="$emit('onClose')"
    @ok="handleOk"
  >
    <template #title>
      <a-tag color="green">
        <template #icon>
          <PlusOutlined />
        </template>
        Agregar cliente
      </a-tag>
    </template>

    <div class="pt-4">
      <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
        <a-form-item label="DNI/RUC" name="identity">
          <a-input
            v-model:value="formState.identity"
            placeholder="Ingresar DNI/RUC!"
          ></a-input>
        </a-form-item>

        <a-form-item label="Nombre Completo" name="name">
          <a-input
            v-model:value="formState.name"
            placeholder="Ingresar nombre completo!"
          ></a-input>
        </a-form-item>

        <a-form-item label="Ingreso Mensual" name="monthlyIncome">
          <a-input
            v-model:value="formState.monthlyIncome"
            placeholder="Ingresar ingreso mensual!"
          ></a-input>
        </a-form-item>
      </a-form>

      <!-- <pre>{{ JSON.stringify(formState, null, 2) }}</pre> -->
    </div>
  </a-modal>
</template>
