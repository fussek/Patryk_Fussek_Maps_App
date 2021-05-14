<template>
<div class="attraction-container">
  <div class="row">
    <div class="col">
      <img class="attraction-thumbnail" :src=attraction.thumbnail_url>
    </div>
    <div class="col">
      <div class="subtitle">{{attraction.name}}</div>
      <div class="subtitle">{{attraction.categories}}</div>
      <div class="subtitle">{{attraction.perex}}</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "AttractionCard",
  props: ['attraction'],

}
</script>

<style scoped>
.attraction-container{
  display: block;
  max-width: 150vh;
  margin: 5px auto;
  max-height: 20vh;
  overflow: auto;
  text-align: center;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}
span{
  display: block;

}
.friends-title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 4;
}

.attraction-thumbnail {
  alignment: left;
  border-radius: 7%;
}
</style>
