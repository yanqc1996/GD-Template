<template>
  <div>
    <global-header></global-header>
    <!-- <Map/> -->
  </div>
</template>
<script>
/**
 * @description 系统主页
 */
// import Map from './gisMap' //地图组件
export default {
  name: "Main",
  components: {
    // Map,
    GlobalHeader: () => import("@/components/main/GlobalHeader"), //头部导航栏
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
