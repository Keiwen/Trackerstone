<template>
    <div class="container">
        <div class="chart">
            <h2>Deck types most played against</h2>
            <deck-type-against-graph :height="100" />
        </div>
        <div class="chart">
            <h2>Win percent against most played deck type</h2>
            <deck-type-won-against-graph :height="100" />
        </div>

    </div>
</template>


<script>
  import DeckTypeAgainstGraph from '@/components/charts/DeckTypeAgainstGraph'
  import DeckTypeWonAgainstGraph from '@/components/charts/DeckTypeWonAgainstGraph'

  export default {
    components: {DeckTypeAgainstGraph, DeckTypeWonAgainstGraph}
  }
</script>
