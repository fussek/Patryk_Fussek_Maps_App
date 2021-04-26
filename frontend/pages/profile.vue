<template>
  <div>
    <SideBar/>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-12 mt-3">
            <div class="row">
              <div class="col">
                <img src='~/assets/pictures/circle-cropped.png' alt="User Avatar">
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
      <div>
        <h1 class="title">
          Your Map
        </h1>
        <div class="container">
          <div class="chartdiv" id="chartdiv"></div>
          <LargeCardDisplay style="margin: 0 auto;"
                            :places="places"
          />
        </div>
      </div>
      <div>
        <h1 class="title">
          Your Friends
        </h1>
        <div v-if="friendsLoaded" class="container">
          <div class="row">
            <div class="col">
              <FriendCard
                v-for="profile in this.profiles.slice(0,3)"
                :key="profile.last_name"
                :profile="profile"
              />
            </div>
            <div class="col">
              <FriendCard
                v-for="profile in this.profiles.slice(4,7)"
                :key="profile.last_name"
                :profile="profile"
              />
            </div>
            <div class="col">
              <FriendCard
                v-for="profile in this.profiles.slice(8,11)"
                :key="profile.last_name"
                :profile="profile"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "~/components/SideBar";
import LargeCardDisplay from "~/components/LargeCardHorizontalList";
import {citiesList} from "~/assets/cities";
import FriendCard from "~/components/FriendCard";
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow"

export default {
  components: {
    SideBar,
    FriendCard,
    LargeCardDisplay
  },

  data() {
    return {
      places: {
        type: Array
      },
      countryCodes: {
        type: Array
      },
      profiles: {
        type: Array
      },
      profile: Object,
      friendsLoaded: false,
      map: null,
      polygonSeries: null,
      polygonTemplate: null
    }
  },
  async asyncData(ctx) {
    return {
      places: await ctx.app.$services.places.findAll()
    }
  },
  async mounted() {

    this.map = am4core.create("chartdiv", am4maps.MapChart)
    this.map.geodata = am4geodata_worldLow
    this.map.projection = new am4maps.projections.Miller()
    this.polygonSeries = this.map.series.push(new am4maps.MapPolygonSeries())
    this.polygonSeries.useGeodata = true
    this.polygonSeries.exclude = ["AQ"];
    this.polygonTemplate = this.polygonSeries.mapPolygons.template;
    this.polygonTemplate.tooltipText = "{name}";
    this.polygonTemplate.fill = am4core.color("#d4d4d4");
    var hs = this.polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#a3a3a3");


    await this.getRandomUsers()
    this.friendsLoaded = true;
  },
  methods: {
    async getRandomUsers() {
      const res = await fetch('https://tinyfac.es/api/users')
      const data = await res.json()
      this.profiles = data
    }
  },
  created() {
    if (this.places) {
      var allCountries = this.places.map(a => a.countryCode);
      this.countryCodes = [...new Set(allCountries)];
    }
  },
  beforeDestroy() {
    if (this.map) {
      this.map.dispose()
    }
  },
  watch: {
    places: function() {
      var allCountries = this.places.map(a => a.countryCode);
      this.countryCodes = [...new Set(allCountries)];
    },
    countryCodes: function() {
      var visitedSeries = this.map.series.push(new am4maps.MapPolygonSeries());
      visitedSeries.name = "Visited countries";
      visitedSeries.useGeodata = true;
      visitedSeries.include = this.countryCodes;
      visitedSeries.mapPolygons.template.tooltipText = "{name}";
      visitedSeries.mapPolygons.template.fill = am4core.color("#16d9d9");
      visitedSeries.fill = am4core.color("#16d9d9");
      this.polygonTemplate = visitedSeries.mapPolygons.template;
      var hs = this.polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#009393");
    }

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

.friends-container {
  margin: 5px auto;
  max-height: 10vh;
  overflow: auto;
  text-align: center;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}

.lead {
  color: #000;
}

.background-image {
  width: 100%;
  alignment: center;
}

.friends-title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 2;
  padding-bottom: 1vh;
  font-size: 5vh;
  color: #35495e;
  letter-spacing: 1px;
  margin-top: 1px;
  text-align: center;
}

.img-circle {
  alignment: left;
  width: 70px;
  height: 70px;
  border-radius: 50%;

}

.chartdiv {
  width: 100%;
  height: 600px;
}
</style>

