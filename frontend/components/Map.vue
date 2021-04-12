<template>
  <div class="container">
    <!--    the v-if required in order to be sure that the array is not empty, otherwise errors (async methods) -->
    <div class="grid" v-if="places.length > 0">
        <h1>Your coordinates:</h1>
        <p>{{ coordinates.lat.toPrecision(8) }} Latitude, {{ coordinates.lng.toPrecision(8) }} Longitude</p>
        <p>
          <gmap-autocomplete ref="gmapAutocomplete" @place_changed="setPlace"/>
          <button class="add-button" @click="usePlace">Add</button>
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

        <SavedPlacesList
          @setCoordinates="setCoordinates"
          v-on="$listeners"
          :places="places"
          style="width: 100%; height: 60vh"
        />
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
    console.log(this.places)
    this.$getLocation({})
      .then((coordinates) => {
        this.coordinates = coordinates
      })
      .catch(error => alert(error))
  },
  methods: {
    getPosition(place) {
      if (place.geometry) {
        if (place.geometry.coordinates) {
          return {
            lat: place.geometry.coordinates[1],
            lng: place.geometry.coordinates[0]
          }
        } else if (place.geometry.location) {
          return {
            lat: parseFloat(place.geometry.location.lat),
            lng: parseFloat(place.geometry.location.lng)
          }
        }
      } else return {
        lat: parseFloat(place.location.latlon.latitude),
        lng: parseFloat(place.location.latlon.longitude)
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
        await this.addToPlaces(this.place)
        this.places = await this.fetchData()
        console.log(this.places)
      }
    },
    //todo: refactor -> json server calls in one place
    async addToPlaces(place) {
      const res = await fetch('http://localhost:5001/features', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(place)
      })
      const data = await res.json()
      return data

    },
    async fetchData () {
      const res = await fetch('http://localhost:5001/features')
      const data = await res.json()
      return data
    },
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

</style>
