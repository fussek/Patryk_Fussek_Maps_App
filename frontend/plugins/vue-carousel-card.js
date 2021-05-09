import Vue from 'vue'
import {
  CarouselCard,
  CarouselCardItem
} from 'vue-carousel-card'
import 'vue-carousel-card/styles/index.css'

export default () => {
  Vue.component(CarouselCard.name, CarouselCard)
  Vue.component(CarouselCardItem.name, CarouselCardItem)
}
