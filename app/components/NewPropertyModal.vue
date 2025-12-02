<script lang="ts" setup>
import type { Rule } from "ant-design-vue/es/form";
import _ from "lodash";
import { ECurrency, EPropertyStatus } from "~/enums";
import type { IProperty } from "~/models/property";

interface Props {
  open: boolean;
  property?: IProperty;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  onClose: [];
}>();

const propertyId = ref<string>();

const { addProperty, updateProperty } = useCrudProperties();

const loading = ref(false);
const formRef = ref();
const formState = reactive<Partial<IProperty>>({
  currency: ECurrency.soles,
  status: EPropertyStatus.available,
});

onMounted(() => {
  if (props.property) {
    Object.assign(formState, props.property);
    propertyId.value = props.property.id;
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
        if (props.property) {
          await updateProperty(props.property.id, _.cloneDeep(formState));
        } else {
          await addProperty(_.cloneDeep(formState));
        }
        notificationSuccess(`Cliente ${props.property ? "editado" : "creado"}`);
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
        Agregar inmueble
      </a-tag>
    </template>

    <div class="pt-4">
      <a-form ref="formRef" :model="formState" :rules="rules" v-bind="layout">
        <a-form-item label="Código" name="code">
          <a-input
            v-model:value="formState.code"
            placeholder="Ingresar código!"
          ></a-input>
        </a-form-item>

        <a-form-item label="Nombre de proyecto" name="nameProject">
          <a-input
            v-model:value="formState.nameProject"
            placeholder="Ingresar nombre de proyecto!"
          ></a-input>
        </a-form-item>

        <a-form-item label="Precio de referencia" name="priceReference">
          <a-input-number
            v-model:value="formState.priceReference"
            placeholder="Ingresar precio referencia!"
          ></a-input-number>
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
      </a-form>

      <!-- <pre>{{ JSON.stringify(formState, null, 2) }}</pre> -->
    </div>
  </a-modal>
</template>
