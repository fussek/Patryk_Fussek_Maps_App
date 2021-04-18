<template>
    <div class="container">
        <h3 class="header">{{ citiesList.title }}</h3>
        <div class="card-container">
            <SmallCard
                v-for="city in getRandomPlaces(citiesList)"
                :key="city.name"
                :city="city"
            />
        </div>
    </div>
</template>

<script>
import SmallCard from "~/components/SmallCard";

export default {
        props: ["citiesList"],
      components: {
        SmallCard
      },
      methods: {
          getRandomPlaces(citiesList){
            const n = 12;
            return citiesList.cities
              .map(x => ({ x, r: Math.random() }))
              .sort((a, b) => a.r - b.r)
              .map(a => a.x)
              .slice(0, n);
          }
      }
    }
</script>

<style scoped>

    .container {
      width: 50%;
      min-height: 20vh;
    }

    .header {
        padding-bottom: 15px;
        font-weight: 700;
        font-size: 1.5rem;
    }

    .card-container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>
