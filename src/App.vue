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
import http from "./services/httpService";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  components: { Header, Footer },

  computed: {
    ...mapGetters(["GET_USER"]),
    isAuth() {
      return this.$route.path === "/auth";
    },
  },

  methods: {
    ...mapActions(["CHECK_USER"]),
    ...mapMutations(["SET_USER_NAME"])
  },

  created() {
    http.interceptors.request.use(
      (config, em = this) => {
        // eslint-disable-next-line no-constant-condition
        if (process.env.NODE_ENV !== "production") {
          if (config.params) config.params["PHPSESSID"] = em.token;
          else
            config.params = {
              PHPSESSID: em.token,
            };
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    this.CHECK_USER(this.GET_USER.token).then((res) => {
      this.SET_USER_NAME(res?.data?.name_cut);

      if (!res && !res?.data?.auth && !this.isAuth) {
        this.$router.push({ name: "auth" });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
#app {
  position: relative;
}
</style>
