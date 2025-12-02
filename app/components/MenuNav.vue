<script lang="ts" setup>
import {
  AimOutlined,
  AuditOutlined,
  BarChartOutlined,
  BarcodeOutlined,
  BlockOutlined,
  CarOutlined,
  ContactsOutlined,
  DollarOutlined,
  FileDoneOutlined,
  GlobalOutlined,
  GoldFilled,
  StockOutlined,
  TagsOutlined,
  TeamOutlined,
} from "@ant-design/icons-vue";
import type { ItemType, MenuProps } from "ant-design-vue";
import type { VueElement } from "vue";

const router = useRouter();
const route = useRoute();

const selectedKeys = ref<string[]>([route.name as string]);
const openKeys = ref(["sub1", "sub2"]);

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: "group"
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}

const items: ItemType[] = reactive([
  getItem("Escritorio", "Dashboard", () => h(BarChartOutlined)),
  getItem("Prestamos", "Loans", () => h(FileDoneOutlined)),
  getItem("Entidades Financieras", "Banks", () => h(DollarOutlined)),
  getItem("Inmuebles", "Properties", () => h(BlockOutlined)),
  getItem("Clientes", "Customers", () => h(ContactsOutlined)),
]);

const handleClick: MenuProps["onClick"] = (e) => {
  router.push({ name: e.key as string });
};

watch(
  () => route.name,
  (newVal) => {
    selectedKeys.value = [newVal as string];
  }
);
</script>

<template>
  <div>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :items="items"
      @click="handleClick"
    />
  </div>
</template>
