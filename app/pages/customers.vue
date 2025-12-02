<script lang="ts" setup>
import type { TableProps } from "ant-design-vue";
import _ from "lodash";

definePageMeta({
  name: "Customers",
});

const handleRemove = (customerId: string) => {
  Modal.confirm({
    title: "Borrar cliente?",
    onOk: async () => {
      // try {
      //   await remove(db, customerId)
      //   notificationSuccess('Se removió cliente')
      // } catch (error: any) {
      //   modalError(error.message)
      // }
    },
  });
};

const handleEditCustomer = (customer: any) => {
  // openEditCustomer.value = true
  // customerCurrent.value = customer
};

const columns: TableProps["columns"] = [
  {
    title: "Item",
    key: "item",
    width: "80px",
    align: "center",
    customRender: ({ index }) => {
      return _.padStart(`${index + 1}`, 2, "0");
    },
  },
  {
    title: "DNI/RUC",
    dataIndex: "identity",
    align: "right",
    width: "110px",
  },
  {
    title: "Cliente",
    dataIndex: "name",
    sorter: (a: any, b: any) =>
      (a.name as string).charCodeAt(0) - (b.name as string).charCodeAt(0),
  },
  {
    title: "Ingreso Mensual",
    dataIndex: "monthlyIncome",
    width: "150px",
    align: "right",
    defaultSortOrder: "descend",
    sorter: (a: any, b: any) => {
      return (a.monthlyIncome ?? 0) - (b.monthlyIncome ?? 0);
    },
    // customRender: ({ value }) => {
    //   return value > 0 ? currency(value, '') : '-'
    // },
  },

  {
    title: "",
    key: "action",
    width: "110px",
    align: "center",
  },
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <a-page-header
      class="bg-white shadow-md"
      style="border: 1px solid rgb(235, 237, 240)"
    >
      <template #title>
        <span class="text-lg font-bold"><ContactsOutlined /> Clientes</span>
      </template>
      <template #subTitle>
        <a-space>
          <AddCustomerButton />
        </a-space>
      </template>

      <template #extra>
        <!-- <AddCategoryCustomerButton /> -->
      </template>
    </a-page-header>

    <a-card class="shadow-md">
      <div class="pb-2">
        <a-space>
          <strong>Filtros: </strong>

          <a-input-search placeholder="Buscar cliente" style="width: 200px" />
        </a-space>
      </div>

      <a-table :columns="columns" :scroll="{ x: 900 }" bordered>
        <template #bodyCell="{ column, record, value }">
          <template v-if="column.dataIndex === 'name'">
            <strong>{{ record.name }}</strong>
          </template>

          <template v-else-if="column.dataIndex === 'identity'">
            <NuxtLink
              :to="{ name: 'CustomerDetail', params: { id: record.id } }"
            >
              {{ _.padStart(value, 11, "0") }}
            </NuxtLink>
          </template>

          <template v-else-if="column.dataIndex === 'MonthlyIncome'">
            <NuxtLink
              :to="{ name: 'CustomerOrders', params: { id: record.id } }"
            >
              {{ currency(value, "") }}
            </NuxtLink>
          </template>

          <template v-else-if="column.key === 'action'">
            <a-dropdown
              placement="bottomRight"
              :arrow="{ pointAtCenter: true }"
            >
              <a class="ant-dropdown-link" @click.prevent>
                Más
                <DownOutlined />
              </a>

              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a @click="handleEditCustomer(record)">Editar</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="handleRemove(record.id)">Eliminar</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
