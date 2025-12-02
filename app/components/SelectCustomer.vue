<script lang="ts" setup>
import { Form } from "ant-design-vue";
import { collection } from "firebase/firestore";
import { customerConverter, type ICustomer } from "~/models/customer";

const model = defineModel<{ id: string; name: string }>();

const emit = defineEmits<{
  selected: [val?: ICustomer];
}>();

const db = useFirestore();
const customersRef = collection(db, "customers").withConverter(
  customerConverter
);
const { data: customers } = useCollection(customersRef, {
  ssrKey: "customers",
});

const formItemContext = Form.useInjectFormItemContext();
const handleChange = (customerId: any) => {
  const findCustomer = customers.value.filter(
    (customer) => customer.id === customerId
  )[0];

  model.value =
    customerId && findCustomer
      ? { id: findCustomer.id, name: findCustomer.name }
      : undefined;

  emit("selected", customerId ? findCustomer : undefined);
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
    :options="customers"
    :field-names="{ value: 'id', label: 'name' }"
    :filter-option="filterOption"
    allow-clear
    @change="handleChange"
  ></a-select>
</template>
