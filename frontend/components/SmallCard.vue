<template>
    <nuxt-link :to="`/cities/${city.name}`" class="card-container">
      <div class="text-overlay" v-if="pictureUrl">
        <img class="image" :src=pictureUrl alt="" v-tooltip.top-center="msg" />
      </div>
    </nuxt-link>
</template>

<script>
import Vue from 'vue'
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

    export default {
        props: ["city"],
      data(){
        return {
          pictureUrl: null,
          msg: this.city.name
        }
      },
      async created() {
        if (this.pictureUrl == null) {
          this.pictureUrl = await this.getPlacePicture()
        }
      },
      methods: {
        //todo: JSON.parse: unexpected character at line 1 column 1 of the JSON data
      async getPlacePicture () {
        var imageQuery = this.city.name.replace(/\s+/g, '-').replace(/,/g, '').toLowerCase();
        const res = await fetch(`https://api.teleport.org/api/urban_areas/slug:${imageQuery}/images/`)
        const data = await res.json()
        var imageLink
        if (data.photos[0]){
          imageLink = data.photos[0].image.mobile
        } else {
          var randomRes = await fetch('https://picsum.photos/300/200')
          const randomData = await randomRes
          imageLink = randomData.url
        }
        return imageLink
      }
      }
    }
</script>

<style scoped>
    .card-container {
        width: 24%;
        height: 12.5rem;
        border-radius: 0.5rem;
        overflow: hidden;
        margin-bottom: 1.5rem;
        cursor: pointer;
    }

    .text-overlay {
      position: center;
      height: 100%;
      width: 100%;
      transition: .5s ease;
      background-color: rgb(255, 255, 255);
    }
    .text-overlay:hover {
      opacity: 0.4;
    }
    .image {
        width: 100%;
        height: 100%
    }
</style>
