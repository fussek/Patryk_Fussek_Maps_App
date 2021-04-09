<template>
  <div>
    <div class="container">
      <SideBar/>
      <h1 class="title">
        My Places:
      </h1>
      <div v-if="showMap">
        <div class="maps-places">
          <div>
            <Map
              @delete="deletePlace"
              :places="places"/>
          </div>
        </div>
        <LargeCardDisplay
          :places="places"
        />
        <SmallCardDisplay
          v-for="citiesList in citiesList"
          :key="citiesList.id"
          :citiesList="citiesList"
        />
      </div>
    </div>
  </div>
</template>

<script>

import Map from '~/components/Map.vue'
import Header from '~/components/Header.vue'
import SavedPlacesList from '~/components/SavedPlacesList'
import LargeCardDisplay from "~/components/LargeCardHorizontalList";
import SmallCardDisplay from "~/components/SmallCardDisplay";
import SideBar from "~/components/SideBar";

import { citiesList } from "~/assets/cities.js"


export default {
  components: {
    SideBar,
    LargeCardDisplay,
    SmallCardDisplay,
    SavedPlacesList,
    Map,
    Header
  },


  data () {
    return {
      places: {
        type: Array
      },
      showMap: false,
      citiesList: citiesList
    }
  },
  async created () {
    this.places = await this.fetchData()
    if (this.places){
      this.showMap = true
    }
  },
  methods: {
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
        this.places = await this.fetchData()
      }
    }
  }
}
</script>

<style scoped>
</style>
