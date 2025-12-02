<script lang="ts" setup>
import type { TableProps } from "ant-design-vue";
import _ from "lodash";

definePageMeta({
  name: "Properties",
});

const { properties, propertiesPending: loading } = useCrudProperties();

const handleRemove = (propertyId: string) => {
  Modal.confirm({
    title: "Borrar inmueble?",
    onOk: async () => {
      // try {
      //   await remove(db, propertyId)
      //   notificationSuccess('Se removió cliente')
      // } catch (error: any) {
      //   modalError(error.message)
      // }
    },
  });
};

const handleEditProperty = (property: any) => {
  // openEditProperty.value = true
  // propertyCurrent.value = property
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
    title: "COD",
    dataIndex: "code",
    align: "right",
    width: "110px",
  },
  {
    title: "Nombre de Inmueble",
    dataIndex: "nameProject",
    sorter: (a: any, b: any) =>
      (a.name as string).charCodeAt(0) - (b.name as string).charCodeAt(0),
  },
  {
    title: "Moneda",
    dataIndex: "currency",
  },
  {
    title: "Precio de Referencia",
    dataIndex: "priceReference",
    width: "150px",
    align: "right",
    customRender: ({ value }) => {
      return value > 0 ? currency(value, "") : "-";
    },
  },
  {
    title: "Estado",
    dataIndex: "status",
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
        <span class="text-lg font-bold"><ContactsOutlined /> Inmuebles</span>
      </template>
      <template #subTitle>
        <a-space>
          <AddPropertyButton />
        </a-space>
      </template>

      <template #extra>
        <AddCategoryPropertyButton />
      </template>
    </a-page-header>

    <a-card class="shadow-md">
      <div class="pb-2">
        <a-space>
          <strong>Filtros: </strong>

          <a-input-search placeholder="Buscar inmueble" style="width: 200px" />
        </a-space>
      </div>

      <a-table
        :columns="columns"
        :data-source="properties"
        :loading="loading"
        :scroll="{ x: 900 }"
        bordered
      >
        <template #bodyCell="{ column, record, value }">
          <template v-if="column.dataIndex === 'name'">
            <strong>{{ record.name }}</strong>
          </template>

          <template v-else-if="column.dataIndex === 'identity'">
            <!-- <NuxtLink
              :to="{ name: 'PropertyDetail', params: { id: record.id } }"
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
                    <a @click="handleEditProperty(record)">Editar</a>
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
