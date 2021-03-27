<template>
  <div class="container">
    <h1>Your coordinates:</h1>
    <p>{{ coordinates.lat.toPrecision(8) }} Latitude, {{ coordinates.lng.toPrecision(8) }} Longitude</p>

    <!--    the v-if required in order to be sure that the array is not empty, otherwise errors (async methods) -->
    <div v-if="places.length > 0">
      <GmapMap
        :center="{lat:coordinates.lat, lng:coordinates.lng}"
        :zoom="4"
        :options="mapStyle"
        map-type-id="roadmap"
        style="width: 100%; height: 300px"
      >
        <GmapMarker
          ref="myPosition"
          :position="{lat:coordinates.lat, lng:coordinates.lng}"
        />
        <GmapMarker
          v-for="place in places"
          :key="place.id"
          :ref="place.id"
          :position="getPosition(place)"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
import styles from 'assets/MapStyle'

export default {
  name: 'Map',
  props: {
    places: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      coordinates: {
        lat: 0,
        lng: 0
      },
      mapStyle: {
        styles
      }
    }
  },
  created () {
    this.$getLocation({})
      .then((coordinates) => {
        this.coordinates = coordinates
      })
      .catch(error => alert(error))
  },
  methods: {
    getPosition (place) {
      return {
        lat: place.geometry.coordinates[1],
        lng: place.geometry.coordinates[0]
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

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
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  text-align: center;
  min-height: 300px;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

</style>
