<template>
  <div class="container">
    <h1 class="title">
      My Places Bucketlist
    </h1>
    <Header :show-add-task="showMap" @toggle-maps="toggleMaps" />
    <div v-if="showMap">
      <SavedPlacesList
        @delete="deletePlace"
        :places="places" />
      <Map :places="places" />
    </div>
  </div>
</template>

<script>

import Map from '~/components/Map.vue'
import Header from '~/components/Header.vue'
import SavedPlacesList from '~/components/SavedPlacesList'

export default {
  components: {
    SavedPlacesList,
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
    },
    async deletePlace(id) {
      if (confirm('Are you sure?')) {
        const res = await fetch(`http://localhost:5001/features/${id}`, {
          method: 'DELETE'
        })
        res.status === 200 ? (this.place = this.places.filter((place) => place.id !== id))
          : alert('Error deleting place')
      }
    }
  }
}
</script>
