
<template>
  <div class="saved-place">
    <div class="saved-place__coordinates">
      <p>{{ savedPlaceCoordinates.lat }} lat, {{ savedPlaceCoordinates.lng }} lng</p>
    </div>
    <div class="saved-place__type" @click="$emit('setCoordinates', savedPlaceCoordinates)">
      {{ place.id }}. {{ getTitle()}}
    </div>
      <Button class="small-button" text='✗' color='crimson'
              @btn-click="$emit('delete', place.id)"
      />
  </div>
</template>

<script>
import Button from './Button'

export default {
  name: 'SavedPlace',
  data() {
    return {
      savedPlaceCoordinates: {
        lat: 0,
        lng: 0
      }
    }
  },
  props: {
    place: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    Button
  },
  created() {
    this.savedPlaceCoordinates = {
      lat: this.getLatitude(),
      lng: this.getLongitude()
    }
  },
  methods: {
    getLatitude() {
      let lat = null;
      if (this.place.geometry) {
        if (this.place.geometry.coordinates) {
          lat = this.place.geometry.coordinates[0]
        } else if (this.place.geometry.location) {
          lat = this.place.geometry.location.lat
        }
      } else lat = this.place.location.latlon.latitude
      return lat
    },
    getLongitude() {
      let lng = null;
      if (this.place.geometry) {
        if (this.place.geometry.coordinates) {
          lng = this.place.geometry.coordinates[1]
        } else if (this.place.geometry.location) {
          lng = this.place.geometry.location.lng
        }
      } else lng = this.place.location.latlon.longitude
      return lng
    },
    getTitle() {
      var title = null;
      if (this.place.hasOwnProperty('properties')){
        title = this.place.properties.Title
      } else if (this.place.formatted_address) {
        title = this.place.formatted_address
      } else title = this.place.full_name
      return title
    }
  }
}
</script>

<style lang="scss" scoped>
.saved-place {
  text-align: center;

  .saved-place__type {
    font-weight: bold;
    cursor: pointer;
  }
  .small-button {
    width: 15%;
    height: 5%;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 5px;
    border-radius: 10px;
  }
}
</style>
