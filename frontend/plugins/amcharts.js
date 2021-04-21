import * as am4core from '@amcharts/amcharts4/core'
import * as am4maps from '@amcharts/amcharts4/maps'
import am4geodataContinents from '@amcharts/amcharts4-geodata/continentsLow'
import am4geodataMiddleEast from '@amcharts/amcharts4-geodata/region/world/worldRegionsLow'
import am4geodataWorldLow from '@amcharts/amcharts4-geodata/worldLow'

import Vue from 'vue'

Vue.prototype.$am4core = () => {
  return {
    am4core,
    am4maps,
    am4geodataContinents,
    am4geodataMiddleEast,
    am4geodataWorldLow
  }
}
