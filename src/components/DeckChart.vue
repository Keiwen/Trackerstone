<template>
    <div class="container">
        <h2>Winrates</h2>

        <deck-win-rate-graph :decks="own" />

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
