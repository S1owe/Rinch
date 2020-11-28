<template>
  <header class="header">
    <div class="header__logo">
      <Logo size="large" color="light" to="/" />
    </div>

    <div class="header__main">
      <nav class="header__navigation">
        <router-link
          v-for="(item, index) in nav"
          :key="index"
          :class="`header__nav-item header__nav-item--${
            currentPath === item.to ? 'active' : 'inactive'
          }`"
          :to="item.to"
        >
          {{ item.text }}
        </router-link>
      </nav>
    </div>

    <div class="header__userInfo">
      <span class="header__userName">{{ userName }}</span>

      <button class="header__logout-icon" @click="logout">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <rect x="5" y="3" width="22" height="25" fill="url(#pattern0)" />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlink:href="#image0"
                transform="translate(0 -0.012) scale(0.0025974 0.00228571)"
              />
            </pattern>
            <image
              id="image0"
              width="385"
              height="448"
              xlink:href="data:image/png;base64,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"
            />
          </defs>
        </svg>
      </button>
    </div>
  </header>
</template>

<script>
import Logo from "./Logo";
import { mapActions } from "vuex";

export default {
  name: "Header",
  components: { Logo },

  props: {
    userName: {
      type: String,
      default: "Кузьмин М.Ю.",
    },
  },

  data() {
    return {
      nav: [
        { text: "Подразделения", to: "/" },
        { text: "Поиск по людям", to: "/search" },
        { text: "Графики активности", to: "/network" },
        { text: "Научные интересы", to: "/graph" },
        { text: "Команды", to: "/team-rating/1" },
      ],
    };
  },

  computed: {
    currentPath() {
      return this.$route.path;
    },
  },

  methods: {
    ...mapActions(["LOGOUT_USER"]),
    logout() {
      this.LOGOUT_USER().then(() => {
        this.$router.push({ name: "auth" });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 30px 120px;
  box-sizing: border-box;
  background-color: #2f73ea;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__main {
    display: flex;
    align-items: center;
  }

  &__navigation {
    display: flex;
    align-items: center;
    margin-right: 90px;
  }

  &__nav-item {
    text-decoration: none;
    font-weight: normal;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
    margin-right: 32px;
    transition: all 0.3s ease;
    letter-spacing: 0.015em;

    &--active {
      text-shadow: 0 0 0.8px #ffffff, 0 0 0.8px #ffffff;
      color: #ffffff;
    }

    &:hover {
      color: #ffffff;
    }

    &:last-child {
      margin-right: 0px;
    }
  }

  &__userInfo {
    display: flex;
    align-items: center;
  }

  &__userName {
    font-weight: normal;
    font-size: 20px;
    color: #ffffff;
    margin-right: 10px;
    cursor: pointer;
  }

  &__logout-icon {
    display: block;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
}
</style>