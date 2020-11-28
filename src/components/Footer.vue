<template>
  <footer class="footer">
    <span class="footer__text">
      ФГБОУ ВО «Ростовский государственный экономический университет
    </span>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  position: absolute;
  bottom: 0px;
  padding: 40px 120px;
  box-sizing: border-box;
  background-color: #2f73ea;
  display: flex;
  justify-content: center;

  &__text {
    font-weight: normal;
    font-size: 18px;
    color: #ffffff;
  }
}
</style>