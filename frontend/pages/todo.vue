<template>
  <div class="container">
    <h1 class="title">
      My Places Bucketlist
    </h1>
    <Header :show-add-task="showMap" @toggle-maps="toggleMaps" />
    <div v-if="showMap">
      <Map />
    </div>
    <to-do-list :todos="todos" />
  </div>
</template>

<script>

import ToDoList from '~/components/ToDoList.vue'
import Map from '~/components/Map.vue'
import Header from '~/components/Header.vue'

export default {
  components: {
    ToDoList,
    Map,
    Header
  },
  // The asyncData function is used to fetch data,
  // which will then replace the corresponding variable in the data block.
  // AsyncData is called whenever a page is loaded.

  async asyncData (ctx) {
    return {
      todos: await ctx.app.$services.todo.findAll()
    }
  },
  // The data function returns an object that we can use in our template.
  // We will need to work with an array to store our todos.
  // We can not make any http request here.
  data () {
    return {
      todos: {
        type: Array
      },
      showMap: false
    }
  },
  methods: {
    toggleMaps () {
      this.showMap = !this.showMap
    }
  }
}
</script>
