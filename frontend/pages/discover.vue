<template>
  <div>
    <SideBar/>
    <div class="container">
      <div>
        <nav>
          <ul id="main">
            <li>Home</li>
            <li>About</li>
            <li>Skills
              <ul class="drop">
                <div>
                  <li>scss</li>
                  <li>jquery</li>
                  <li>html</li>
                </div>
              </ul>
            </li>
            <li>Contact</li>
            <div id="marker"></div>
          </ul>
        </nav>
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

export default {
  name: "discover",
  components: {
    SideBar
  },
  async mounted() {

    let map = am4core.create("chartdiv", am4maps.MapChart)
    map.geodata = am4geodata_worldLow
    map.projection = new am4maps.projections.Miller()
    var polygonSeries = map.series.push(new am4maps.MapPolygonSeries())
    polygonSeries.useGeodata = true
    polygonSeries.exclude = ["AQ"];
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#d4d4d4");
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#a3a3a3");
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

</style>
