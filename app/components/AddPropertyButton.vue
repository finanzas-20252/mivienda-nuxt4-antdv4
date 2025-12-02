<script lang="ts" setup>
const open = ref(false);
</script>

<template>
  <div>
    <a-button type="primary" @click="open = true">
      <template #icon> <PlusOutlined /> </template>
      Añadir inmueble
    </a-button>

    <NewPropertyModal v-if="open" :open="open" @on-close="open = false" />
  </div>
</template>
