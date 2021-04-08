<template>
  <div>
    <div v-if="place" class="place-container">

      <h1 class="title">
        {{ place.formatted_address }}
      </h1>
      <p>
        Place id number: {{ this.$route.params.place }}
      </p>
      <img :src=flagUrl alt=""/>

      <p>
        Coordinates: {{ place.geometry }}
      </p>

      <NuxtLink class="home" to="/todo">⌂</NuxtLink>

    </div>
  </div>
</template>

<script>

export default {
  name: "place",
  data() {
    return {
      place: {
        type: Array
      },
      showMap: false,
      flagUrl: null,
      countryCode: null,
      id: this.$route.params.place,
    }
  },

  async created() {
    this.place = await this.fetchPlaceData()
    if (this.place) {
      this.showMap = true
      this.countryCode = this.place.address_components[this.place.address_components.length - 1].short_name
      this.flagUrl = this.fetchFlagUrl()
    }
  },

  methods: {
    async fetchPlaceData() {
      const res = await fetch(`http://localhost:5001/features/${this.id}`)
      const data = await res.json()
      return data
    },
    fetchFlagUrl() {
      return `https://www.countryflags.io/${this.countryCode}/flat/64.png`
    }
  }
}
</script>

<style scoped>
.place-container {
  max-width: 800px;
  margin: 30px auto;
  overflow: auto;
  text-align: center;
  min-height: 300px;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);

}

.home {
  font-size: 10vh;
  alignment: center;
  color: black;
  text-decoration: none;
  transition: 0.3s;
}
.home:hover {
  color: darkgrey;

}
</style>
