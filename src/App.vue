<template>
  <div id="app" class="b-flex flex-column justify-content-between">
    <Header v-if="!isAuth" />
    <router-view class="component flex-grow-1" :key="$route.path" />
    <Footer v-if="!isAuth" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: { Header, Footer },

  computed: {
    isAuth() {
      return this.$route.path === "/auth";
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  position: relative;
}
</style>
