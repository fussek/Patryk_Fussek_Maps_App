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
        <div class="large-cards-container">
          <LargeCardDisplay style="margin: 0 auto;"
                            :places="places"
          />
        </div>
        <div class="cards-container">
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
    },
    getRandomPlace() {
      return citiesList[0].cities[Math.floor(Math.random() * citiesList[0].cities.length)].name
    },
  }
}
</script>

<style scoped>
.large-cards-container {
  max-width: 1400px;
  margin: 30px auto;
  overflow: auto;
  text-align: center;
  min-height: 200px;
  padding: 60px;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.cards-container {
  max-width: 1400px;
  margin: 30px auto;
  overflow: auto;
  text-align: center;
  min-height: 200px;
  padding: 60px;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
