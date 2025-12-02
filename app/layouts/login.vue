<script setup lang="ts">
import { theme as antdTheme } from "ant-design-vue";
import esES from "ant-design-vue/es/locale/es_ES";

const locale = ref(esES);

const theme = reactive({
  algorithm: antdTheme.compactAlgorithm,
});
</script>
<template>
  <a-config-provider :locale="locale" :theme="theme">
    <div>
      <slot />
    </div>
  </a-config-provider>
</template>
