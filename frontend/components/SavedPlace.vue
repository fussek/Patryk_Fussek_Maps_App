
<template>
  <div class="saved-place">
    <div class="saved-place__coordinates">
      <p>{{ savedPlaceCoordinates.lat }} lat, {{ savedPlaceCoordinates.lng }} lng</p>
    </div>
    <div class="saved-place__type" @click="$emit('setCoordinates', savedPlaceCoordinates)">
      {{ getTitle()}}
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
      lat: parseFloat(this.getLatitude()),
      lng: parseFloat(this.getLongitude())
    }
  },
  methods: {
    getLatitude() {
      let lat = null;
      if (this.place.latitude){
        lat = this.place.latitude
      }
      return lat
    },
    getLongitude() {
      let lng = null;
      if (this.place.longitude){
        lng = this.place.longitude
      }
      return lng
    },
    getTitle() {
      var title = null;
      if (this.place.fullName){
        title = this.place.fullName
      }
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
