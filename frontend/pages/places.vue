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
              @delete="deleteFromDB"
              :places="places"/>
          </div>
        </div>
        <div class="cards-container">
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
  async asyncData(ctx){
    return {
      places: await ctx.app.$services.places.findAll()
    }
  },
  async created () {
    if (this.places){
      this.showMap = true
    }
  },
  methods: {
    async fetchData () {
      return await this.$services.places.findAll()
    },
    async deleteFromDB(id){
      this.$services.places.deleteItem(id).then(() => {
        this.$emit('deleted', id)
      })
      this.places = await this.fetchData()
    }
  }
}
</script>

<style scoped>
.cards-container {

  width: 100%;
  min-height: 400px;
  overflow: inherit;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
