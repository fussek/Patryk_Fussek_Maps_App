<template>
  <div>
    <NuxtLink class="link" to="/places">⌂</NuxtLink>
    <NuxtLink class="link" :to="`/cities/${getRandomPlace()}`">⧖</NuxtLink>
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
              <button v-if="isAlreadyAdded" class="button-deny">
                Already added
              </button>
              <button v-else class="button-allow" @click=addToPlaces()>
                Add to your place!
              </button>
            </h1>

          </i>
        </div>
        <vue-horizontal-list v-if="imagesLoaded" class="horizontal" :items=this.images :options="horizontalListOptions">
          <template v-slot:default="{ item }">
            <div class="image-container">
              <img :src="item.urls.small" />
            </div>
          </template>
        </vue-horizontal-list>
      </div>
      <div class="grid">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis libero orci. Mauris mattis libero ut risus dictum ornare eu id lacus. Suspendisse scelerisque eget enim elementum ultrices. Phasellus sed dolor sem. Nam et nulla eu tortor efficitur efficitur non ut sem. Maecenas quis nibh metus. Nunc eu nibh lorem.

          Nulla facilisi. Sed dignissim ultricies iaculis. Nunc et est ipsum. Mauris nisl orci, ornare sed euismod ut, viverra eget nisi. Mauris non mi consectetur, viverra ante cursus, pharetra lacus. Suspendisse volutpat urna et diam consequat lacinia. Sed hendrerit interdum quam, sit amet faucibus tortor commodo sed. Ut sit amet felis et ligula mollis porttitor. Vivamus quis dapibus magna. Ut accumsan ante interdum lorem mollis, vel luctus turpis tincidunt. In finibus imperdiet euismod. Pellentesque sagittis volutpat erat rhoncus tristique. Phasellus fringilla eget tellus in auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

          In vitae eleifend dolor. Fusce luctus vestibulum ligula, vel laoreet ex porta a. Vestibulum laoreet pretium nulla, at accumsan orci mattis id. Etiam a nunc sed leo elementum suscipit. Duis aliquam pulvinar tempor. Sed hendrerit libero sed nulla viverra, eget varius nisi dapibus. Vivamus tristique tristiquelibero vitae tempor.
        </p>
        <p>Suspendisse sit amet sodales nibh, vel tristique arcu. Vestibulum mattis venenatis nisi sit amet fermentum. Curabitur nec justo elit. Duis quis velit pharetra, suscipit massa in, porta mi. Nullam et sapien vitae mauris condimentum semper. Morbi a sapien non dolor imperdiet aliquet eu quis tortor. Morbi ultricies gravida ipsum, id rutrum tellus. Cras finibus nibh odio, a commodo sapien dignissim id. Vivamus rutrum arcu dolor, vel dignissim ante ultricies nec.

          Cras in aliquam risus. Aenean consequat, neque eu mattis placerat, eros lacus facilisis mi, et faucibus nisl sem finibus tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu ultricies justo. Aliquam ut purus pulvinar, dignissim purus sit amet, gravida neque. Aliquam velit purus, sollicitudin at velit at, elementum consequat velit. Maecenas vel diam ultrices, eleifend ex in, condimentum enim.

          Cras consectetur vitae elit at laoreet. Sed sodales tempor ligula. Maecenas imperdiet ultricies tellus, ac imperdiet ex gravida sed. Donec laoreet ligula in dolor vestibulum auctor. Nullam quis quam est. Ut non diam lacus. Sed ut urna pellentesque, interdum leo eu, sodales ex. Praesent elementum metus nec ullamcorper bibendum. Sed scelerisque lacinia eleifend. Donec dapibus iaculis ultrices.
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

export default {
  name: "place",
  components: {
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
      images: [],
      imagesLoaded: false,
      isAlreadyAdded: false,
      showMap: false,
      flagUrl: null,
      countryCode: null,
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
      this.countryCode = this.place._links["city:country"].href.replace(/[&\/\\#,+_()$~%.'":*?<>{}a-z0-9]/g, '').toLowerCase();
      return `https://flagcdn.com/w320/${this.countryCode}.png`
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
        this.coordinates.lng).then((data) => {
        this.$emit('created', data)
      })
      alert('Added !')
      this.isAlreadyAdded = true
    },
    getRandomPlace() {
      return citiesList[0].cities[Math.floor(Math.random() * citiesList[0].cities.length)].name
    },
    getUnsplashImages() {
      const unsplash = createApi({ accessKey: 'K_VnqxwvuQx3CVRJfR2fU57IHwxbOUhIH1BsaY6And8' });
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

.button-allow{
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
.button-deny{
  display:inline-block;
  padding:0.3em 1.2em;
  margin:0 0.3em 0.3em 0;
  border-radius:2em;
  box-sizing: border-box;
  text-decoration:none;
  cursor: initial;
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
</style>