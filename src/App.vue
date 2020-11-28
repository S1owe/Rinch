<template>
  <div id="app">
    <Header v-if="!isAuth" />
    <router-view class="component" :key="$route.path" />
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
