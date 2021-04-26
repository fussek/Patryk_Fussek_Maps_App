<template>
<div>
  <Slide disableOutsideClick isOpen noOverlay disableEsc :closeOnNavigation="false" width="400" >
    <NuxtLink class="nuxtlink" to="/places">
      <span>
        <fa icon="home"/>
        Home
      </span>
    </NuxtLink>
    <NuxtLink class="nuxtlink" to="/profile">
      <span>
        <fa icon="user"/>
        Profile
      </span>
    </NuxtLink>
    <NuxtLink class="nuxtlink" to="/route">
      <span>
        <fa icon="map"/>
        Route Planer
      </span>
    </NuxtLink>
    <NuxtLink class="nuxtlink" to="/discover">
      <span>
        <fa icon="globe"/>
        Discover
      </span>
    </NuxtLink>
    <NuxtLink class="nuxtlink" :to="`/cities/${getRandomPlace()}`">
      <span>
        <fa icon="compass"/>
        Take me anywhere!
      </span>
    </NuxtLink>
    <NuxtLink class="nuxtlink" to="/">
      <span>
        <fa icon="power-off"/>
        Logout
      </span>
    </NuxtLink>
  </Slide>
</div>
</template>

<script>

import { citiesList } from "~/assets/cities.js"

export default {
  data () {
    return {
      citiesList: citiesList
    }
  },
  methods: {
    getRandomPlace() {
      return citiesList[0].cities[Math.floor(Math.random() * citiesList[0].cities.length)].name
    }
  }
}
</script>

<style scoped>
.nuxtlink {
  font-size: 3vh;
  text-decoration: none;
  transition: 0.3s;
}
.nuxtlink:hover {
  color: darkgrey;
}
</style>
