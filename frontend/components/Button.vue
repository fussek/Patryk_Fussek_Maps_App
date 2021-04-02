<template>
  <button :style="{ background: color }" class="btn" @click="onclick()">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'black'
    }
  },
  methods: {
    onclick () {
      this.$emit('btn-click')
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
</style>
