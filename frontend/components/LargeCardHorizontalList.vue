<template>
    <div class="horizontal-container">
        <h4 class="header">
            Your Places
        </h4>
        <p class="snippet" >
            Discover your saved places below:
        </p>
        <div class="cards-container">
          <vue-horizontal-list class="horizontal" :items=this.places :options="options">
            <template v-slot:default="{ item }">
              <LargeCard :place="item" v-on="$listeners"/>
            </template>
          </vue-horizontal-list>
        </div>
    </div>
</template>

<script>
import LargeCard from "~/components/LargeCard";
import VueHorizontalList from "vue-horizontal-list"

    export default {
      components:{
        VueHorizontalList,
        LargeCard
      },
        props: {
          places: {
            type: Array,
            default () {
              return []
            }
          },
          emits: ['markCountry', 'unmarkCountry']
        },
      data() {
        return {
          options: {
            responsive: [
              { end: 576, size: 1 },
              { start: 576, end: 768, size: 2 },
              { size: 3 },
            ],
          },
        }
      }
    }
</script>

<style scoped>
.horizontal-container {
  padding-top: 30px;
  display: block;
  margin-left: 25%;
  margin-right: 25%;
  margin-bottom: 5vh;
  justify-content: space-between;

}
/*.container {*/
/*  margin-top: 2rem;*/
/*  min-height: 10vh;*/
/*  width: 50%;*/
/*}*/
.header {
  font-weight: 700;
  font-size: 1.5rem;
}
.snippet {
  color: grey;
  margin-bottom: 1.5rem;
}
.cards-container {
  justify-content: space-between;
}
</style>
