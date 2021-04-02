
<template>
  <div class="saved-place">
    <div class="saved-place__coordinates">
      <p>{{ getLatitude() }} lat, {{ getLongitude() }} lng</p>
    </div>
    <div class="saved-place__type">
      {{ place.id }}. {{ getTitle()}}
    </div>
  </div>
</template>

<script>
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
  methods: {
    getLatitude() {
      var lat = null;
      if (this.place.geometry.coordinates){
        lat = this.place.geometry.coordinates[0]
      } else lat = this.place.geometry.location.lat
      return lat
    },
    getLongitude() {
      var lng = null;
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
  .saved-place__type{
    font-weight: bold;

  }
  }
</style>
