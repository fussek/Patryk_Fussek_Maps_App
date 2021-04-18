<template>
    <nuxt-link :to="`/cities/${city.name}`" class="card-container">
      <div class="text-overlay" v-if="pictureUrl">
        <img class="image" :src=pictureUrl alt=""/>
      </div>
    </nuxt-link>
</template>

<script>
    export default {
        props: ["city"],
      data(){
        return {
          pictureUrl: null
        }
      },
      async created() {
        if (this.pictureUrl == null) {
          this.pictureUrl = await this.getPlacePicture()
        }
      },
      methods: {
      async getPlacePicture () {
        const res = await fetch('https://picsum.photos/300/200')
        const data = await res
        return data.url
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
    .text-overlay:hover .text {
      visibility: visible;
      opacity: 1;
      color: white;
      font-size: 20px;
      position: relative;
      text-decoration: none;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
    .image {
        width: 100%;
        height: 100%
    }
</style>
