<template>
    <div class="container">
        <div class="chart">
            <h2>Winrates</h2>
            <deck-win-rate-graph :height="100" />
        </div>
        <div class="chart">
            <h2>Win score</h2>
            <deck-win-score-graph :height="100" />
        </div>

    </div>
</template>


<script>

  import DeckWinRateGraph from '@/components/charts/DeckWinRateGraph'
  import DeckWinScoreGraph from '@/components/charts/DeckWinScoreGraph'

  export default {
    components: {DeckWinRateGraph, DeckWinScoreGraph}
  }

</script>
