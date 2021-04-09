
<template>
  <div class="saved-place">
    <div class="saved-place__coordinates">
      <p>{{ getLatitude() }} lat, {{ getLongitude() }} lng</p>
    </div>
    <div class="saved-place__type">
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
  methods: {
    getLatitude() {
      let lat = null;
      if (this.place.geometry.coordinates){
        lat = this.place.geometry.coordinates[0]
      } else lat = this.place.geometry.location.lat
      return lat
    },
    getLongitude() {
      let lng = null;
      if (this.place.geometry.coordinates){
        lng = this.place.geometry.coordinates[1]
      } else lng = this.place.geometry.location.lng
      return lng
    },
    getTitle() {
      var title = null;
      if (this.place.hasOwnProperty('properties')){
        title = this.place.properties.Title
      } else title = this.place.formatted_address
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
