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
  padding: 40px 120px;
  box-sizing: border-box;
  background-color: #2f73ea;
  display: flex;
  justify-content: center;
  margin-top: 10px;

  &__text {
    font-weight: normal;
    font-size: 18px;
    color: #ffffff;
  }
}
</style>