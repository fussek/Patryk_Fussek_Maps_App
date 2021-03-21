<template>
  <button :style="{ background: color }" class="btn" @click="onclick()">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
    color: String
  },
  methods: {
    onclick () {
      this.$emit('btn-click')
    }
  }
}
</script>

<style scoped>

</style>
