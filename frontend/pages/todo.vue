<template>
  <div class="container">
    <h1 class="title">
      My Places Bucketlist
    </h1>
    <Header :show-add-task="showMap" @toggle-maps="toggleMaps" />
    <div v-if="showMap">
      <SavedPlacesList :places="places" />
      <Map :places="places" />
    </div>
    <to-do-list :todos="todos" />
  </div>
</template>

<script>

import ToDoList from '~/components/ToDoList.vue'
import Map from '~/components/Map.vue'
import Header from '~/components/Header.vue'
import SavedPlacesList from '~/components/SavedPlacesList'

export default {
  components: {
    SavedPlacesList,
    ToDoList,
    Map,
    Header
  },

  async asyncData (ctx) {
    return {
      todos: await ctx.app.$services.todo.findAll()
    }
  },

  data () {
    return {
      places: {
        type: Array
      },
      todos: {
        type: Array
      },
      showMap: false
    }
  },
  async created () {
    this.places = await this.fetchData()
  },
  methods: {
    toggleMaps () {
      this.showMap = !this.showMap
    },
    async fetchData () {
      const res = await fetch('http://localhost:5001/features')
      const data = await res.json()
      return data
    }
  }
}
</script>
