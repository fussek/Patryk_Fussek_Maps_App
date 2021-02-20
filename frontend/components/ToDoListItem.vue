<template>
  <div :class="{ completed: todo.completed }" class="to-do-item">
    <span>{{ todo.title }}</span>
    <div class="controls">
      <span @click="deleteItem">🗑</span>
      <span @click="completeItem">✓</span>
    </div>
  </div>
</template>

<script>
/// //////////////////////////////////////////////////child
export default {
  name: 'ToDoListItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    completeItem () {
      this.$services.todo.complete(this.todo).then((data) => {
        this.$emit('completed', this.todo)
      })
    },
    deleteItem () {
      this.$services.todo.deleteItem(this.todo.id).then(() => {
        this.$emit('deleted', this.todo)
      })
    }
  }
}
</script>

<style lang="scss">
.to-do-item {
  width: 100%;
  display: block;
  height: 50px;
  &.completed {
    opacity: 0.2;
  }
  span {
    height: 50px;
    padding-left: 20px;
    line-height: 50px;
    width: 300px;
    display: inline-block;
  }
  .controls {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    float: right;
    span {
      line-height: 50px;
      height: 50px;
      display: inline-block;
      width: 45px;
      text-align: center;
      padding: 0;
      cursor: pointer;
    }
  }
}
</style>
