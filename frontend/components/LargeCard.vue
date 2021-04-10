<template>
  <nuxt-link :to="`/places/${getTitle(place)}`" class="card">
      <div v-if="pictureUrl" class="image-container">
        <img class="large-img" :src=pictureUrl alt=""/>
      </div>
      <div class="subtitle">TITLE • SNIPPET</div>

      <h3>{{ getTitle(place) }}</h3>
      <p>{{ place.id }}</p>
  </nuxt-link>
</template>

<script>
    export default {
      data(){
        return {
          pictureUrl: null
        }
      },
        props: ['card', 'place'],
      async created() {
        this.pictureUrl = await this.getPlacePicture()
      },
      methods: {
        getTitle() {
          var title = null;
          if (this.place.hasOwnProperty('properties')){
            title = this.place.properties.Title
          } else title = this.place.formatted_address
          return title
        },
        async getPlacePicture () {
          const res = await fetch('https://picsum.photos/350/250')
          const data = await res
          return data.url
        }
      }
    }
</script>

<style scoped>

.card{
  color: black;
  text-decoration: none;
  transition: 0.3s;
}
.card:hover {
  color: darkgrey;
}
.large-img {
  border-radius: 0.5rem;
}




/*p {*/
/*  margin-top: 4px;*/
/*  width: 70%;*/
/*  overflow: hidden;*/
/*  display: -webkit-box;*/
/*  text-overflow: ellipsis;*/
/*  word-break: break-word;*/

/*  -webkit-box-orient: vertical;*/
/*  -webkit-line-clamp: 2;*/
/*}*/

/*.subtitle {*/
/*  margin-top: 12px;*/
/*  font-size: 14px;*/
/*  font-weight: 500;*/
/*  margin-bottom: 6px;*/
/*}*/

.image-container {
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

/*img {*/
/*  object-fit: cover;*/
/*  width: 100%;*/
/*  height: 100%;*/

/*  position: absolute;*/
/*  top: 0;*/
/*  bottom: 0;*/
/*  left: 0;*/
/*  right: 0;*/
/*}*/



    /*.card {*/
    /*    width: 31.5%;*/
    /*    height: 25rem;*/
    /*    border: none;*/
    /*    overflow: hidden;*/
    /*    padding: 0;*/
    /*    cursor: pointer;*/
    /*}*/
    /*.image {*/
    /*    height: 65%;*/
    /*    border-radius: 0.5rem;*/
    /*}*/
    /*.header {*/
    /*    font-size: 1.15rem;*/
    /*    margin-top: 0.4rem;*/
    /*}*/
    /*.snippet {*/
    /*    color: grey*/
    /*}*/
</style>
