<template>
  <div id="app" ref="app" :style="styles">
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
    styles() {
      return {
        height: `${this.scrollHeight}px`,
      };
    },
  },

  data() {
    return {
      scrollHeight: 0,
      observerConfig: {
        attributes: true,
        subtree: true,
        attributeFilter: ["class", "style"],
      },
    };
  },

  methods: {
    updHeight() {
      this.$nextTick(() => {
        const scrollHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight
        );

        this.scrollHeight = scrollHeight;
      });
    },
  },

  watch: {
    $route() {
      this.scrollHeight = 0;
      this.updHeight();
    },
  },

  mounted() {
    this.observer = new MutationObserver(this.updHeight);
    this.observer.observe(this.$refs.app, this.observerConfig);
    this.updHeight();
  },
};
</script>

<style lang="scss" scoped>
#app {
  position: relative;
}
</style>
