<script lang="ts" setup>
import { Form } from "ant-design-vue";
import { collection } from "firebase/firestore";
import { bankConverter, type IBank } from "~/models/bank";

const model = defineModel<{ id: string; name: string }>();

const emit = defineEmits<{
  selected: [val?: IBank];
}>();

const db = useFirestore();
const banksRef = collection(db, "banks").withConverter(bankConverter);
const { data: banks } = useCollection(banksRef, {
  ssrKey: "banks",
});

const formItemContext = Form.useInjectFormItemContext();
const handleChange = (bankId: any) => {
  const findBank = banks.value.filter((bank) => bank.id === bankId)[0];

  model.value =
    bankId && findBank ? { id: findBank.id, name: findBank.name } : undefined;

  emit("selected", bankId ? findBank : undefined);
  formItemContext.onFieldChange();
};

const filterOption = (input: string, option: any) => {
  return option.name.toLowerCase().includes(input.toLowerCase());
};
</script>

<template>
  <a-select
    :value="model?.id"
    show-search
    placeholder="Seleccionar un cliente"
    :options="banks"
    :field-names="{ value: 'id', label: 'name' }"
    :filter-option="filterOption"
    allow-clear
    @change="handleChange"
  ></a-select>
</template>
