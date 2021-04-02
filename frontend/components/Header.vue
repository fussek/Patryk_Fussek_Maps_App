<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      :text="showAddTask ? 'Close' : 'Show Maps'"
      :color="showAddTask ? 'crimson' : 'green'"
      @btn-click="$emit('toggle-maps')"
    />
  </header>
</template>

<script>
import Button from './Button'
export default {
  name: 'Header',
  components: {
    Button
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    showAddTask: Boolean
  },
  emits: ['toggle-maps']
}
</script>

<style scoped>
header {
  align-items: center;
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  padding: 30px;
  border-radius: 5px;
}

</style>
