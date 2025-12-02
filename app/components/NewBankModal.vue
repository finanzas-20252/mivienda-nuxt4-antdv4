<script lang="ts" setup>
import type { Rule } from "ant-design-vue/es/form";
import _ from "lodash";
import { EBankType } from "~/enums";
import type { IBank } from "~/models/bank";

interface Props {
  open: boolean;
  bank?: IBank;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  onClose: [];
}>();

const bankId = ref<string>();

const { addBank, updateBank } = useCrudBanks();

const loading = ref(false);
const formRef = ref();
const formState = reactive<Partial<IBank>>({
  type: EBankType.banco,
});

onMounted(() => {
  if (props.bank) {
    Object.assign(formState, props.bank);
    bankId.value = props.bank.id;
  }
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
      try {
        loading.value = true;
        if (props.bank) {
          await updateBank(props.bank.id, _.cloneDeep(formState));
        } else {
          await addBank(_.cloneDeep(formState));
        }
        notificationSuccess(`Cliente ${props.bank ? "editado" : "creado"}`);
        emit("onClose");
      } catch (error: any) {
        modalError(error.message);
      } finally {
        loading.value = false;
      }
    })
    .catch((error: any) => {
      console.log("error", error);
    });
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
        <a-form-item label="RUC" name="ruc">
          <a-input
            v-model:value="formState.ruc"
            placeholder="Ingresar RUC!"
          ></a-input>
        </a-form-item>

        <a-form-item label="Nombre" name="name">
          <a-input
            v-model:value="formState.name"
            placeholder="Ingresar nombre!"
          ></a-input>
        </a-form-item>

        <a-form-item label="Tipo" name="type">
          <a-select
            ref="select"
            v-model:value="formState.type"
            style="width: 120px"
          >
            <a-select-option :value="EBankType.banco">Banco</a-select-option>
            <a-select-option :value="EBankType.financiera"
              >financiera</a-select-option
            >
            <a-select-option :value="EBankType.cmac">CMAC</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>

      <!-- <pre>{{ JSON.stringify(formState, null, 2) }}</pre> -->
    </div>
  </a-modal>
</template>
