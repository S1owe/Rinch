<template>
  <router-link class="logo" :class="classes" :to="to">
    <span class="logo__text">НАУКА РГЭУ</span>
  </router-link>
</template>

<script>
export default {
  name: "Logo",

  props: {
    size: {
      type: String,
      default: "big",
      validator: (value) => ["small", "medium", "big", "large"].includes(value),
    },
    color: {
      type: String,
      default: "light",
      validator: (value) => ["light", "dark"].includes(value),
    },
    to: {
      type: String,
      default: null,
    },
  },

  computed: {
    classes() {
      const prefix = "logo";

      return {
        [`${prefix}--size_${this.size}`]: !!this.size,
        [`${prefix}--color_${this.color}`]: !!this.color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";

.logo {
  display: block;
  cursor: pointer;
  text-decoration: none;

  &__text {
    font-weight: bold;
  }

  &--size_small {
    & .logo__text {
      font-size: 16px;
    }
  }

  &--size_medium {
    & .logo__text {
      font-size: 20px;
    }
  }

  &--size_big {
    & .logo__text {
      font-size: 28px;
    }
  }

  &--size_large {
    & .logo__text {
      font-size: 32px;
    }
  }

  &--color_light {
    & .logo__text {
      color: #ffffff;
    }
  }

  &--color_dark {
    & .logo__text {
      color: #000000;
    }
  }
}
</style>