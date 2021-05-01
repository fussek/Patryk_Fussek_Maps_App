<template>
  <div>
    <SideBar/>
    <div class="container">
      <div>
        <nav>
          <ul id="main">
            <li>Continents
              <ul class="drop">
                <div>
                  <li @click="setContinent(AFRICA, 2.37, 16.06, 2)">Africa</li>
                  <li @click="setContinent(ASIA, 51.716667, 94.45, 2)">Asia</li>
                  <li @click="setContinent(EUROPE, 51.05, 13.74, 3)">Europe</li>
                  <li @click="setContinent(NORTH_AMERICA, 48.367222, -99.996111, 3)">North America</li>
                  <li @click="setContinent(SOUTH_AMERICA, -15.6006, -56.1004, 2)">South America</li>
                  <li @click="setContinent(OCEANIA, -30.992684,146.562230, 4)">Oceania</li>
                </div>
              </ul>
            </li>
            <div id="marker"></div>
          </ul>
        </nav>
        <div class="gallery">
          <figure class="gallery__item gallery__item--1">
            <img src='~/assets/pictures/AF.png' alt="Africa" class="gallery__img"
                 @click="setContinent(AFRICA, 2.37, 16.06, 2)">
            <div class="middle">
              <div class="text">Africa</div>
            </div>
          </figure>
          <figure class="gallery__item gallery__item--2">
            <img src='~/assets/pictures/AS.png' alt="Asia" class="gallery__img"
                 @click="setContinent(ASIA, 51.716667, 94.45, 2)">
            <div class="middle">
              <div class="text">Asia</div>
            </div>
          </figure>
          <figure class="gallery__item gallery__item--3">
            <img src='~/assets/pictures/EU.png' alt="Europe" class="gallery__img"
                 @click="setContinent(EUROPE, 51.05, 13.74, 3)">
            <div class="middle">
              <div class="text">Europe</div>
            </div>
          </figure>
          <figure class="gallery__item gallery__item--4">
            <img src='~/assets/pictures/NA.png' alt="North America" class="gallery__img"
                 @click="setContinent(NORTH_AMERICA, 48.367222, -99.996111, 3)">
            <div class="middle">
              <div class="text">North America</div>
            </div>
          </figure>
          <figure class="gallery__item gallery__item--5">
            <img src='~/assets/pictures/SA.png' alt="South America" class="gallery__img"
                 @click="setContinent(SOUTH_AMERICA, -15.6006, -56.1004, 2)">
            <div class="middle">
              <div class="text">South America</div>
            </div>
          </figure>
          <figure class="gallery__item gallery__item--6">
            <img src='~/assets/pictures/OC.png' alt="Oceania" class="gallery__img"
                 @click="setContinent(OCEANIA, -30.992684,146.562230, 4)">
            <div class="middle">
              <div class="text">Oceania</div>
            </div>
          </figure>
        </div>
      </div>
      <div class="container">
        <div class="chartdiv" id="chartdiv"></div>

      </div>
    </div>

  </div>
</template>

<script>
import SideBar from "~/components/SideBar";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { AFRICA, ASIA, EUROPE, NORTH_AMERICA, SOUTH_AMERICA, OCEANIA } from "~/assets/continents.js";

export default {
  name: "discover",
  components: {
    SideBar
  },
  data() {
    return {
      OCEANIA: OCEANIA,
      SOUTH_AMERICA: SOUTH_AMERICA,
      NORTH_AMERICA: NORTH_AMERICA,
      EUROPE: EUROPE,
      ASIA: ASIA,
      AFRICA: AFRICA,
      countryCodes: {
        type: Array
      },
      locationFocus: {
        type: Array
      },
      map: null,
      polygonSeries: null,
      polygonTemplate: null
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
  },
  methods: {
    setContinent(continent, latitude, longitude, zoomLevel) {
      this.countryCodes = continent
    }
  },
  beforeDestroy() {
    if (this.map) {
      this.map.dispose()
    }
  },
  watch: {
    countryCodes: function (newCountryCodes, oldCodes) {
      this.map = am4core.create("chartdiv", am4maps.MapChart)
      this.map.geodata = am4geodata_worldLow
      this.map.projection = new am4maps.projections.Miller()
      if (newCountryCodes === ASIA){
        this.map.deltaLongitude = -104.8;
        this.map.zoomLevel = 23;
      }
      this.polygonSeries = this.map.series.push(new am4maps.MapPolygonSeries())
      this.polygonSeries.useGeodata = true
      this.polygonSeries.include = newCountryCodes
      this.polygonTemplate = this.polygonSeries.mapPolygons.template;
      this.polygonTemplate.tooltipText = "{name}";
      this.polygonTemplate.fill = am4core.color("#d4d4d4");
      this.polygonTemplate.strokeOpacity = 1;
      var hs = this.polygonTemplate.states.create("hover");
      hs.properties.fill = am4core.color("#a3a3a3");

    }
  }
}
</script>

<style lang="scss" scoped>
$min-width: 120px;
$maincolor: #c7c7c7;
$secondarycolor: #afafaf;

@mixin transform($value) {
  -webkit-transform: ($value);
  -moz-transform: ($value);
  -ms-transform: ($value);
  transform: ($value);
}

@mixin transition($value) {
  -webkit-transition: ($value);
  -moz-transition: ($value);
  -ms-transition: ($value);
  transition: ($value);
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  background: #374954;
  color: white;
  text-align: center;
}

#main {
  position: relative;
  list-style: none;
  background: $maincolor;
  font-weight: 400;
  font-size: 0;
  text-transform: uppercase;
  display: inline-block;
  padding: 0;
  margin: 50px auto;

  li {
    font-size: 0.8rem;
    display: inline-block;
    position: relative;
    padding: 15px 20px;
    cursor: pointer;
    z-index: 5;
    min-width: $min-width;
  }
}

li {
  margin: 0;
}

.drop {
  overflow: hidden;
  list-style: none;
  position: absolute;
  padding: 0;
  width: 100%;
  left: 0;
  top: 48px;

  div {
    @include transform(translate(0, -100%));
    @include transition(all 0.5s 0.1s);
    position: relative;
  }

  li {
    display: block;
    padding: 0;
    width: 100%;
    background: $secondarycolor !important;
  }
}

#marker {
  height: 6px;
  background: $secondarycolor !important;
  position: absolute;
  bottom: 0;
  width: $min-width;
  z-index: 2;
  @include transition(all 0.35s);
}

@for $i from 1 through 4 {
  #main li:nth-child(#{$i}) {
    &:hover ul div {
      @include transform(translate(0, 0));
    }

    &:hover ~ #marker {
      @include transform(translate(#{(-1+$i)*$min-width}, 0));
    }
  }
}

.container {
  max-width: 1400px;
  margin: 30px auto;
  overflow: auto;
  text-align: center;
  min-height: 800px;
  padding: 60px;
  border-radius: 5px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);

}

.chartdiv {
  width: 100%;
  height: 600px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 0.5rem;
}

.gallery__img {
  width: 80%;
  height: 80%;
  cursor: pointer;
  object-fit: cover;
  display: block;
  opacity: 1;
  transition: .5s ease;
  backface-visibility: hidden;
}

.gallery__item:hover .gallery__img {
  opacity: 0.3;
}
.gallery__item:hover .middle {
  opacity: 1;
}
.middle {
  transition: .5s ease;
  opacity: 0;
  position: inherit;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
.text {
  background-color: #16d9d9;
  color: white;
  font-size: 16px;
  padding: 16px 32px;
}
.gallery__item--1 {
  grid-column-start: 2;
  grid-column-end: 3;
}

.gallery__item--2 {
  grid-column-start: 3;
  grid-column-end: 4;
}

.gallery__item--3 {
  grid-column-start: 4;
  grid-column-end: 5;
}

.gallery__item--4 {
  grid-column-start: 5;
  grid-column-end: 6;
}

.gallery__item--5 {
  grid-column-start: 6;
  grid-column-end: 7;
}

.gallery__item--6 {
  grid-column-start: 7;
  grid-column-end: 7;
}
</style>
