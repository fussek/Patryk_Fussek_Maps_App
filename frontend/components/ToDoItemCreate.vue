<template>
  <div class="create-container">
    <input v-model="titleOfNewToDo" type="text">
    <button @click="create">
      Add
    </button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      titleOfNewToDo: ''
    }
  },
  methods: {
    create () {
      this.$services.todo.create(this.titleOfNewToDo).then((data) => {
        this.$emit('created', data)
        this.titleOfNewToDo = ''
      })
    }
  }
}
</script>
