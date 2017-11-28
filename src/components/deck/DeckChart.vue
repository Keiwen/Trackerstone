<template>
    <div class="container">

        <flickity ref="deckCharts" :options="{'wrapAround': true}" class="tsCarousel tsCharts">
            <div class="carousel-cell chart">
                <h3>Winrates</h3>
                <deck-win-rate-graph :height="180" />
            </div>
            <div class="carousel-cell chart">
                <h3>Win score</h3>
                <deck-win-score-graph :height="180" />
            </div>
        </flickity>

    </div>
</template>


<script>
  import Flickity from 'vue-flickity'
  import DeckWinRateGraph from '@/components/charts/DeckWinRateGraph'
  import DeckWinScoreGraph from '@/components/charts/DeckWinScoreGraph'

  export default {
    components: {Flickity, DeckWinRateGraph, DeckWinScoreGraph}
  }
</script>
