<template>
    <div class="container">
        <div class="chart">
            <h2>Winrates</h2>
            <deck-win-rate-graph :decks="own" :height="100" />
        </div>

    </div>
</template>


<script>

  import { mapGetters } from 'vuex'
  import DeckWinRateGraph from '@/components/charts/DeckWinRateGraph'

  export default {
    components: {DeckWinRateGraph},
    computed: {
      ...mapGetters(['own'])
    }
  }

</script>
