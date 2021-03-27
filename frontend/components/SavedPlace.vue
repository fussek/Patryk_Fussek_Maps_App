
<template>
  <div class="saved-place">
    <div class="saved-place__coordinates">
      <p>{{ place.geometry.coordinates[0] }} lat, {{ place.geometry.coordinates[1] }} lng</p>
    </div>
    <div class="saved-place__type">
      {{ place.properties.Title }}
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
  }
}
</script>

<style lang="scss" scoped>
.saved-place {
    text-align: center;
  }
</style>
