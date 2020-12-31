<template>
  <div class="container">
    <Menu></Menu>
    <router-view></router-view>
  </div>
</template>
<script>
import Menu from "@/components/Menu";

export default {
  name: "Index",
  components: { Menu },
};
</script>


<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
}
</style>
