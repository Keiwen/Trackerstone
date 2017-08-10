<template>
    <div class="container">
        <div class="chart">
            <h2>Winrates</h2>
            <deck-win-rate-graph :decks="own" :height="100" />
        </div>
        <div class="chart">
            <h2>Win score</h2>
            <deck-win-score-graph :decks="own" :height="100" />
        </div>

    </div>
</template>


<script>

  import { mapGetters } from 'vuex'
  import DeckWinRateGraph from '@/components/charts/DeckWinRateGraph'
  import DeckWinScoreGraph from '@/components/charts/DeckWinScoreGraph'

  export default {
    components: {DeckWinRateGraph, DeckWinScoreGraph},
    computed: {
      ...mapGetters(['own'])
    }
  }

</script>
