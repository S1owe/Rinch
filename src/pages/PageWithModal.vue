<template>
  <div>
    <button @click="is_show_modal = true">Открыть модалку!</button>

    <ModalCreateCommand v-model="is_show_modal" @send="send" />
  </div>
</template>

<script>
import ModalCreateCommand from "@/components/ModalCreateCommand";
export default {
  name: "PageWithModal",
  components: {ModalCreateCommand},
  data: function () {
    return {
      is_show_modal: false
    }
  },
  methods: {
    send: function (e) {
      // eslint-disable-next-line
      console.log(e);
    }
  }
}
</script>

<style scoped>

</style>