<template>
  <div>
    <SideBar/>
    <div>
      <div class="container">
          <div class="row">
            <div class="col-md-12 mt-3">
              <div class="row">
                <div class="col">
                  <img class="img-circle" src='~/assets/pictures/circle-cropped.png' alt="User Avatar" style="width: 50%">
                </div>
                <div class="col">
                  <h1 class="title" style="alignment: bottom">Patryk Fussek</h1>

                  <span>PLACES VISITED</span>
                  <h5>{{ places.length }}</h5>
                  <span>PLACES TO VISIT</span>
                  <h5>{{ 356 - places.length }}</h5>
                  <span>FOLLOWERS</span>
                  <h5>35</h5>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="container">

      </div>


<!--<div class="row">-->
<!--  <div class="col">-->
<!--    <Card title="Overview">-->

<!--    </Card>-->
<!--  </div>-->
<!--  <div class="col">-->
<!--    <Card title="Overview">-->

<!--    </Card>-->
<!--  </div>-->
<!--</div>-->
    </div>
  </div>
</template>

<script>
import SideBar from "~/components/SideBar";
import Card from "~/components/Card";
import {citiesList} from "~/assets/cities";

export default {
  components: {
    SideBar,
    Card
  },

  data () {
    return {
      places: {
        type: Array
      }
    }
  },
  async asyncData(ctx){
    return {
      places: await ctx.app.$services.places.findAll()
    }
  },
  mounted() {

  },
  methods: {

  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1400px;
  margin: 30px auto;
  overflow: auto;
  text-align: center;
  min-height: 200px;
  padding: 60px;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
.lead {
  color: #000;
}
.background-image{
  width: 100%;
  alignment: center;
}
.title{
  padding-bottom: 2vh;
}
</style>

