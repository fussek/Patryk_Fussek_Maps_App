<template>
  <div class="friends-container">
    <div class="row">
      <div class="col">
        <img class="img-circle" src='~/assets/pictures/default-avatar.png' alt="User Avatar">
      </div>
      <div class="col">
        <span class="friends-title"> {{ profile.first_name }} {{ profile.last_name }} </span>
        <span>Saved places: {{ Math.floor(Math.random()*(30))}} </span>
        <span>Wishlist: {{ Math.floor(Math.random()*(300))}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FriendCard",
  props: ['profile'],

}
</script>

<style scoped>
.friends-container{
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

.img-circle {
  alignment: left;
  width: 70px;
  height: 70px;
  border-radius: 50%;

}
</style>
