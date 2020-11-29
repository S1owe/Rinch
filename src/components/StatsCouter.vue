<template>
  <div class="stats-counter">
    <div class="stats-counter__count">{{ count }}</div>
    <hr class="stats-counter__hr-line" />
    <div class="stats-counter__counter-name">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: "StatsCounter",

  props: {
    count: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang='scss' scoped>
.stats-counter {
  padding: 18px 40px;
  box-sizing: border-box;
  background-color: #2f73ea;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  height: 108px;

  &__count {
    font-weight: 600;
    font-size: 36px;
    color: #ffffff;
    line-height: 110%;
  }

  &__hr-line {
    border: none;
    margin: 3px 0px;
    color: #ffffff;
    background-color: #ffffff;
    width: 100%;
    height: 1px;
  }

  &__counter-name {
    font-weight: 300;
    font-size: 14px;
    color: #ffffff;
    line-height: 140%;
  }
}
</style>