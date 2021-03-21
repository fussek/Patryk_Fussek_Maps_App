<template>
  <div class="container">
    <h1>Your coordinates:</h1>
    <p>{{ coordinates.lat }} Latitude, {{ coordinates.lng }} Longitude</p>

    <div>
      <GmapMap
        :center="{lat:coordinates.lat, lng:coordinates.lng}"
        :zoom="15"
        map-type-id="terrain"
        style="width: 100%; height: 300px"
      >
        <GmapMarker
          v-for="(m, index) in markers"
          :key="index"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Map',
  data () {
    return {
      coordinates: {
        lat: 0,
        lng: 0
      }
    }
  },
  created () {
    this.$getLocation({})
      .then((coordinates) => {
        this.coordinates = coordinates
      })
      .catch(error => alert(error))
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

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
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

</style>
