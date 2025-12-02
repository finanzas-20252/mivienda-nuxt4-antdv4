<script setup lang="ts">
import { theme as antdTheme } from "ant-design-vue";
import esES from "ant-design-vue/es/locale/es_ES";

const locale = ref(esES);

const theme = reactive({
  algorithm: antdTheme.compactAlgorithm,
  components: {
    Card: {
      colorFillAlter: "#1677ff",
      colorBgContainer: "#ffffff",
      // colorTextHeading: 'white',
    },
  },
  token: {
    borderRadius: 0,
    // fontSize: 11,
  },
});

// const color = reactive({
//   bg:"#fff",
//   color:"#000"
// })
// const changeTheme = (type:'dark' | 'light') => {
//   if(type === 'dark'){
//     theme.algorithm = antdTheme.darkAlgorithm
//     color.bg = "#000"
//     color.color = "#fff"
//   }else{
//     theme.algorithm = antdTheme.defaultAlgorithm
//     color.bg = "#fff"
//     color.color = "#000"
//   }
// }
</script>

<template>
  <a-config-provider :locale="locale" :theme="theme">
    <a-layout has-sider>
      <SiderMain />
      <a-layout>
        <a-layout-header>
          <!-- <span class="text-lg font-bold"><BarChartOutlined /> Escritorio</span> -->
          <!-- <MenuNavDashboard /> -->
        </a-layout-header>
        <br />
        <a-layout-content>
          <slot />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>
