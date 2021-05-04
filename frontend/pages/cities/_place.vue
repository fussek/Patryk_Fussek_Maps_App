<template>
  <div>
    <SideBar/>
    <h1 class="title">
      {{ place.full_name }}
    </h1>
    <div v-if="place" class="place-container">
      <div>
        <div>
          <GmapMap
            :center="{lat:coordinates.lat, lng:coordinates.lng}"
            :zoom="5"
            :options="mapStyle"
            map-type-id="roadmap"
            style="width: 100%; height: 300px; box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1)"
          >
            <GmapMarker
              ref="myPosition"
              :position="{lat:coordinates.lat, lng:coordinates.lng}"
              style="color: dodgerblue"
            />
          </GmapMap>
        </div>
        <div class="grid">
          <h1 class="title">
          <img class="image" v-if="flagUrl" :src=flagUrl alt=""/>
          </h1>
          <i>
            <h1 class="title">
              Population:
              {{ getPopulation() }}
            </h1>
            <h1 class="title">
              <button v-if="isAlreadyAdded" class="button-delete" @click=deleteFromPlaces()>
                Delete from your places
              </button>
              <button v-else class="button-add" @click=addToPlaces()>
                Add to your places!
              </button>
            </h1>

          </i>
        </div>
        <vue-horizontal-list v-if="imagesLoaded" class="horizontal" :items=this.images :options="horizontalListOptions" v-viewer="viewerOptions">
          <template v-slot:default="{ item }">
            <div class="image-container" >
              <img :src="item.urls.small" :full-src="item.urls.regular"/>
            </div>
          </template>
        </vue-horizontal-list>
      </div>
      <div class="grid" v-if="this.wikiDescription">
        <p>
          {{ this.wikiDescription.slice(0, (this.wikiDescription.length)/2)}}
        </p>
        <p>
          {{this.wikiDescription.slice((this.wikiDescription.length)/2, this.wikiDescription.length -1)}}
        </p>
      </div>
      <NuxtLink class="link" to="/places">⌂</NuxtLink>
      <NuxtLink class="link" :to="`/cities/${getRandomPlace()}`">⧖</NuxtLink>
    </div>
  </div>
</template>

<script>
import styles from "~/assets/MapStyle";
import Button from "~/components/Button";
import { citiesList } from "~/assets/cities.js";
import { createApi } from 'unsplash-js';
import SmallCardDisplay from "~/components/SmallCardDisplay";
import VueHorizontalList from "vue-horizontal-list"
import SideBar from "~/components/SideBar";
import fetch from 'cross-fetch';
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
import axios from "axios";

Vue.use(Viewer)

export default {
  name: "place",
  components: {
    SideBar,
    VueHorizontalList,
    SmallCardDisplay,
    Button
  },
  props:{
    citiesList
  },
  data() {
    return {
      coordinates: {
        lat: 0,
        lng: 0
      },
      place: {
        type: Array,
        _links: undefined
      },
      mapStyle: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: true,
        styles
      },
      horizontalListOptions: {
        responsive: [
          { end: 576, size: 1 },
          { start: 576, end: 768, size: 2 },
          { size: 3 },
        ],
      },
      viewerOptions: {
        inline: false,
        button: true,
        navbar: true,
        title: false,
        toolbar: false,
        tooltip: false,
        movable: false,
        zoomable: false,
        rotatable: false,
        scalable: false,
        transition: false,
        fullscreen: false,
        keyboard: true,
        url: 'full-src'

      },
      images: [],
      imagesLoaded: false,
      isAlreadyAdded: false,
      showMap: false,
      flagUrl: null,
      countryCode: null,
      wikiDescription: null,
      alternateCityNames: [],
      query: this.$route.params.place,
    }
  },

  async created() {
    this.place = await this.fetchPlaceData()
    if (this.place) {
      this.showMap = true
      this.flagUrl = await this.fetchFlagUrl()
      this.coordinates = {
        lat:this.getLatitude(this.place),
        lng:this.getLongitude(this.place)
      }
      this.alternateCityNames = await this.findAlternateNames()
      await this.getUnsplashImages()
      await this.fetchWikipediaInfo()
      this.isAlreadyAdded = await this.findInUserPlaces()
    }
  },

  methods: {
    async fetchPlaceData() {
      const res = await fetch(`https://api.teleport.org/api/cities/?search=${this.query}`)
      const data = await res.json()
      const queryLink = await fetch(data._embedded["city:search-results"][0]._links["city:item"].href)
      return await queryLink.json()
    },
    async fetchFlagUrl() {
      // todo: this method overrides countryCode variable which is retrieved from Place object
      this.countryCode = this.place._links["city:country"].href.replace(/[&\/\\#,+_()$~%.'":*?<>{}a-z0-9]/g, '').toLowerCase();
      return `https://flagcdn.com/w320/${this.countryCode}.png`
    },
    async fetchWikipediaInfo() {
      const res = await fetch(`https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro=1&explaintext=1&titles=${this.place.name}`)
      const data = await res.json()
      this.wikiDescription = Object.entries(data.query.pages)[0][1].extract
    },
    getLatitude() {
      return this.place.location.latlon.latitude
    },
    getLongitude() {
      return this.place.location.latlon.longitude
    },
    getPopulation(){
      let pop = 0;
      if (this.place.population){
        pop = this.place.population
      }
      return pop
    },
    async findAlternateNames(){
      const res = await fetch(this.place._links["city:alternate-names"].href)
      const data = await res.json()
      return data.alternate_names
    },
    async findInUserPlaces() {
      const data = await this.$services.places.findAll();
      return this.containsValue(data)
    },

    containsValue(data) {
      let contains = false;
      let i;
      for (i = 0; i < data.length; i++) {
        contains = this.alternateCityNames.some(alternateName => data[i].name === alternateName.name)
        if (contains) break
      }
      return contains;
    },
    async addToPlaces() {
      await this.$services.places.create(this.place.name,
        this.place.full_name,
        this.coordinates.lat,
        this.coordinates.lng,
        this.fetchCountryCode()).then((data) => {
        this.$emit('created', data)
      })
      alert('Added !')
      this.isAlreadyAdded = true
    },
    async deleteFromPlaces() {
      this.$services.places.deleteItem(this.place.id).then(() => {
        alert('Deleted !')
      })
      this.isAlreadyAdded = false
    },
    getRandomPlace() {
      return citiesList[0].cities[Math.floor(Math.random() * citiesList[0].cities.length)].name
    },
    getUnsplashImages() {
      const unsplash = createApi({ accessKey: 'ePT1Bui9LN9iWox6z__-vq4TSx7hWR53I8DxRKYqn-k' });
      unsplash.search.getPhotos({
        query: this.query,
        page: 1,
        perPage: 12,
        width: 300,
        height: 200,
        orderBy: 'views',
        orientation: 'landscape',
      }).then(result => {
        if (result.errors) {
          console.log('error occurred: ', result.errors[0]);
        } else {
          const feed = result.response;
          // extract total and results array from response
          const { total, results } = feed;
          this.images = results
          this.imagesLoaded = true
        }
      })

    },
    fetchCountryCode() {
      var countries = require("i18n-iso-countries");
      countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
      var n = this.place.full_name.lastIndexOf(',');
      var country = this.place.full_name.substring(n + 2);
      return countries.getAlpha2Code(country, "en")
    }
  }
}
</script>

<style scoped>
.grid{
  margin-left: 50px;
  margin-right: 50px;
  column-gap: 50px;
  padding: 10px;
  display: grid;
  column-count: 2;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  justify-content: center;
  text-align: justify;
  align-items: center;
}
.place-container {
  max-width: 1400px;
  margin: 30px auto;
  overflow: auto;
  text-align: center;
  min-height: 200px;
  padding: 60px;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);

}

.button-add{
  display:inline-block;
  padding:0.3em 1.2em;
  margin:0 0.3em 0.3em 0;
  border-radius:2em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  color:#FFFFFF;
  background-color: #1d6f18;
  text-align:center;
  transition: all 0.2s;
  font-size: 24px;
  letter-spacing: 1px;
  margin-top: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.button-allow:hover{
  opacity: 0.9;
}
@media all and (max-width:30em){
  .button-allow{
    display:block;
    margin:0.2em auto;
  }
}
.button-delete{
  display:inline-block;
  padding:0.3em 1.2em;
  margin:0 0.3em 0.3em 0;
  border-radius:2em;
  box-sizing: border-box;
  text-decoration:none;
  cursor: pointer;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  color:#FFFFFF;
  background-color: #6f1818;
  text-align:center;
  transition: all 0.2s;
  font-size: 24px;
  letter-spacing: 1px;
  margin-top: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.link {
  font-size: 10vh;
  alignment: center;
  color: black;
  text-decoration: none;
  transition: 0.3s;
}
.link:hover {
  color: darkgrey;
}
.image{
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.image-container {
  cursor: pointer;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  min-width: 350px;
  min-height: 250px;
}
.horizontal {
  width: 100%;
  min-height: 400px;
  border-radius: 5px;
  padding-top: 30px;
  margin-bottom: 5vh;
  justify-content: space-between;

}
.wikiDescription{
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 8;
}
</style>
