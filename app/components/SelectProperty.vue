<script lang="ts" setup>
import { Form } from "ant-design-vue";
import { collection } from "firebase/firestore";
import { propertyConverter, type IProperty } from "~/models/property";

const model = defineModel<{ id: string; nameProject: string }>();

const emit = defineEmits<{
  selected: [val?: IProperty];
}>();

const db = useFirestore();
const propertiesRef = collection(db, "properties").withConverter(
  propertyConverter
);
const { data: properties } = useCollection(propertiesRef, {
  ssrKey: "properties",
});

const formItemContext = Form.useInjectFormItemContext();
const handleChange = (propertyId: any) => {
  const findProperty = properties.value.filter(
    (property) => property.id === propertyId
  )[0];

  model.value =
    propertyId && findProperty
      ? { id: findProperty.id, nameProject: findProperty.nameProject }
      : undefined;

  emit("selected", propertyId ? findProperty : undefined);
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
    placeholder="Seleccionar inmueble"
    :options="properties"
    :field-names="{ value: 'id', label: 'nameProject' }"
    :filter-option="filterOption"
    allow-clear
    @change="handleChange"
  ></a-select>
</template>
