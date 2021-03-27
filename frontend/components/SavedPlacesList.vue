<template>
  <div>
    <h1> Your Saved Places </h1>
    <div class="saved-places-list-container">
      <saved-place
        v-for="place in places"
        :key="place.id"
        :place="place"
      />
    </div>
  </div>
</template>

<script>
import SavedPlace from '~/components/SavedPlace'

export default {
  name: 'SavedPlacesList',
  components: {
    SavedPlace
  },
  props: {
    places: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}

.saved-places-list-container {
  height:200px;
  overflow-y: auto;
  width: 400px;
  margin: auto;
  margin-top: 50px;
  display: block;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);

  .saved-place{
    padding-bottom: 10px;
  }
}
</style>
