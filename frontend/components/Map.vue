<template>
  <div class="container">
    <!--    the v-if required in order to be sure that the array is not empty, otherwise errors (async methods) -->
    <div v-if="places.length > 0">
      <div class="row">
        <div class="col">
          <h1>Your coordinates:</h1>
          <p>{{ coordinates.lat }} Latitude, {{ coordinates.lng }} Longitude</p>
          <p>
          </p>
          <GmapMap
            :center="{lat:coordinates.lat, lng:coordinates.lng}"
            :zoom="4"
            :options="mapStyle"
            map-type-id="roadmap"
            style="width: 100%; height: 60vh"
          >
            <GmapMarker
              ref="myPosition"
              :position="{lat:coordinates.lat, lng:coordinates.lng}"
              style="background-color: dodgerblue"
            />
            <GmapMarker
              v-for="place in places"
              :key="place.id"
              :ref="place.id"
              :position="getPosition(place)"

            />
          </GmapMap>
        </div>
        <div class="col">
          <SavedPlacesList
            @setCoordinates="setCoordinates"
            v-on="$listeners"
            :places="places"
            style="width: 100%; height: 60vh"
          />
        </div>
      </div>



    </div>
  </div>
</template>

<script>
import styles from 'assets/MapStyle'
import SavedPlacesList from "~/components/SavedPlacesList";

export default {
  name: 'Map',
  components:{
    SavedPlacesList
  },
  props: {
    places: {
      type: Array,
      default() {
        return []
      }
    }
  },
  emits: ['delete'],
  data() {
    return {
      coordinates: {
        lat: 0,
        lng: 0
      },
      place: null,
      mapStyle: {
        styles
      }
    }
  },
  created() {
    this.$getLocation({})
      .then((coordinates) => {
        this.coordinates = coordinates
      })
      .catch(error => alert(error))
  },
  methods: {
    getPosition(place) {
      if (place.latitude && place.longitude){
        return {
          lat: parseFloat(place.latitude),
          lng: parseFloat(place.longitude)
        }
      }
    },
    setPlace(place) {
      this.place = place
    },
    setCoordinates(savedPlaceCoordinates) {
      this.coordinates = savedPlaceCoordinates
    },
    async usePlace() {
      if (this.place) {
        this.coordinates = {
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        };
        await this.createBackendItem()
        this.places = await this.fetchData()
      }
    },
    //todo: refactor -> backend calls in one place
    async fetchData () {
      return await this.$services.places.findAll()
    },
    async createBackendItem () {
        await this.$services.places.create(this.place.name,
          this.place.formatted_address,
          this.coordinates.lat,
          this.coordinates.lng,
          this.fetchCountryCode(),
          []).then((data) => {
          this.$emit('created', data)
        })

    },
    fetchCountryCode() {
      var countries = require("i18n-iso-countries");
      countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
      var n = this.place.formatted_address.lastIndexOf(',');
      var country = this.place.formatted_address.substring(n + 2);
      return countries.getAlpha2Code(country, "en")
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

.grid {
  column-count: 2;
  width: 100%;
  min-height: 300px;
  place-items: center;
}
p {
  padding-bottom: 10px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  width: 80%;
  min-height: 400px;
  margin: 30px auto;
  overflow: auto;
  text-align: center;
  min-height: 500px;
  padding-left: 60px;
  padding-right: 60px;
  padding-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);

}
.add-button {
  background-color: green;
  width: 30%;
  height: 15%;
  border: none;
  cursor: pointer;
  margin-top: 5px;
  border-radius: 10px;
}
.pac-container {
  background-color: #ac1717;
  position: absolute!important;
  z-index: 1000;
  border-radius: 2px;
  border-top: 1px solid #2774c9;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden
}

.pac-logo:after {
  content: "";
  padding: 1px 1px 1px 0;
  height: 16px;
  text-align: right;
  display: block;
  background-image: url(https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3.png);
  background-position: right;
  background-repeat: no-repeat;
  background-size: 120px 14px
}
.hdpi.pac-logo:after {
  background-image: url(https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3_hdpi.png)
}
.pac-item {
  cursor: default;
  padding: 0 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 30px;
  text-align: left;
  border-top: 1px solid rgba(48, 186, 83, 0.38);
  font-size: 11px;
  color: #bb11b3
}
.pac-item:hover {
  background-color: #952323
}
.pac-item-selected,
.pac-item-selected:hover {
  background-color: #c9c60e
}
.pac-matched {
  font-weight: 700
}
.pac-item-query {
  font-size: 13px;
  padding-right: 3px;
  color: #000
}
.pac-icon {
  width: 15px;
  height: 20px;
  margin-right: 7px;
  margin-top: 6px;
  display: inline-block;
  vertical-align: top;
  background-image: url(https://maps.gstatic.com/mapfiles/api-3/images/autocomplete-icons.png);
  background-size: 34px
}
.hdpi .pac-icon {
  background-image: url(https://maps.gstatic.com/mapfiles/api-3/images/autocomplete-icons_hdpi.png)
}
.pac-icon-search {
  background-position: -1px -1px
}
.pac-item-selected .pac-icon-search {
  background-position: -18px -1px
}
.pac-icon-marker {
  background-position: -1px -161px
}
.pac-item-selected .pac-icon-marker {
  background-position: -18px -161px
}
.pac-placeholder {
  color: #292682
}
</style>
