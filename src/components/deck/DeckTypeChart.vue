<template>
    <div class="container">

        <flickity ref="arenaCharts" :options="{'wrapAround': true}" class="tsCharts">
            <div class="carousel-cell chart">
                <h3>Deck types most played against</h3>
                <deck-type-against-graph :height="180" />
            </div>
            <div class="carousel-cell chart">
                <h3>Win percent against most played deck type</h3>
                <deck-type-won-against-graph :height="180" />
            </div>
        </flickity>

    </div>
</template>


<script>
  import Flickity from 'vue-flickity'
  import DeckTypeAgainstGraph from '@/components/charts/DeckTypeAgainstGraph'
  import DeckTypeWonAgainstGraph from '@/components/charts/DeckTypeWonAgainstGraph'

  export default {
    components: {Flickity, DeckTypeAgainstGraph, DeckTypeWonAgainstGraph}
  }
</script>
