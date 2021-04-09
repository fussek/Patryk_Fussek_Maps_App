<template>
    <nuxt-link :to="`/places/${city.name}`" class="card-container">
      <div v-if="pictureUrl">
        <img :src=pictureUrl alt=""/>
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
        this.pictureUrl = await this.getPlacePicture()
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

    .image {
        width: 100%;
        height: 100%
    }
</style>
