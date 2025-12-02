<script lang="ts" setup>
import type { TableProps } from "ant-design-vue";
import _ from "lodash";

definePageMeta({
  name: "Banks",
});

const { banks, banksPending: loading } = useCrudBanks();

const handleRemove = (bankId: string) => {
  Modal.confirm({
    title: "Borrar cliente?",
    onOk: async () => {
      // try {
      //   await remove(db, bankId)
      //   notificationSuccess('Se removió cliente')
      // } catch (error: any) {
      //   modalError(error.message)
      // }
    },
  });
};

const handleEditBank = (bank: any) => {
  // openEditBank.value = true
  // bankCurrent.value = bank
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
    title: "RUC",
    dataIndex: "ruc",
    align: "right",
    width: "110px",
  },
  {
    title: "Nombre",
    dataIndex: "name",
    sorter: (a: any, b: any) =>
      (a.name as string).charCodeAt(0) - (b.name as string).charCodeAt(0),
  },
  {
    title: "Tipo",
    dataIndex: "type",
    width: "150px",
    align: "right",
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
        <span class="text-lg font-bold"
          ><ContactsOutlined /> Entidades Financieras</span
        >
      </template>
      <template #subTitle>
        <a-space>
          <AddBankButton />
        </a-space>
      </template>

      <template #extra>
        <!-- <AddCategoryBankButton /> -->
      </template>
    </a-page-header>

    <a-card class="shadow-md">
      <div class="pb-2">
        <a-space>
          <strong>Filtros: </strong>

          <a-input-search
            placeholder="Buscar entidad financiera"
            style="width: 200px"
          />
        </a-space>
      </div>

      <a-table
        :columns="columns"
        :data-source="banks"
        :loading="loading"
        :scroll="{ x: 900 }"
        bordered
      >
        <template #bodyCell="{ column, record, value }">
          <template v-if="column.dataIndex === 'name'">
            <strong>{{ record.name }}</strong>
          </template>

          <template v-else-if="column.dataIndex === 'ruc'">
            <!-- <NuxtLink
              :to="{ name: 'BankDetail', params: { id: record.id } }"
            >
              {{ _.padStart(value, 11, "0") }}
            </NuxtLink> -->
            {{ _.padStart(value, 11, "0") }}
          </template>

          <template v-else-if="column.dataIndex === 'monthlyIncome'">
            {{ currency(value, "") }}
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
                    <a @click="handleEditBank(record)">Editar</a>
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
