<template>
    <div class="container">

        <flickity ref="deckTypeCharts" :options="{'wrapAround': true}" class="tsCarousel tsCharts">
            <div class="carousel-cell chart">
                <h3>Deck types most played against</h3>
                <deck-type-against-graph :height="180" :currentOnly="currentOnly" />
            </div>
            <div class="carousel-cell chart">
                <h3>Win percent against most played deck type</h3>
                <deck-type-won-against-graph :height="180" :currentOnly="currentOnly" />
            </div>
        </flickity>

        <enhanced-toggle labelOn="Current" labelOff="All decks"
                         styleOn="primary" styleOff="success"
                         class="chart-special-button"
                         v-model="currentOnly" :rounded="true" >
        </enhanced-toggle>

    </div>
</template>


<script>
  import { EnhancedToggle } from 'vue-enhanced-check'
  import Flickity from 'vue-flickity'
  import DeckTypeAgainstGraph from '@/components/charts/DeckTypeAgainstGraph'
  import DeckTypeWonAgainstGraph from '@/components/charts/DeckTypeWonAgainstGraph'

  export default {
    components: {EnhancedToggle, Flickity, DeckTypeAgainstGraph, DeckTypeWonAgainstGraph},
    data () {
      return {
        currentOnly: false
      }
    }
  }
</script>
