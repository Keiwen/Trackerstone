<template>
    <div>
        <h4>{{ generateDeckTitle(deck) }}</h4>
        <p>
            Won {{ getDeckGamesWonCount() }} / {{ getDeckGamesPlayedCount() }}
            <i>
                ({{ getDeckWinPercent() }} % global, {{ getDeckWinPercent(true) }} % last {{ getDeckGamesPlayedCount(true) }} games)
                - score {{ getDeckWinScore() }}
            </i>
        </p>
    </div>
</template>


<script>

  import { mapGetters } from 'vuex'

  export default {
    props: ['deck', 'idDeck'],
    computed: {
      ...mapGetters(['generateDeckTitle', 'getGamesWithDeck', 'getGamesWonWithDeck', 'getWinPercentWithDeck', 'getWinScoreWithDeck'])
    },
    methods: {
      getDeckGamesPlayedCount (recent) {
        return this.getGamesWithDeck(this.idDeck, recent).length
      },
      getDeckGamesWonCount (recent) {
        return this.getGamesWonWithDeck(this.idDeck, recent).length
      },
      getDeckWinPercent (recent) {
        return this.getWinPercentWithDeck(this.idDeck, recent)
      },
      getDeckWinScore (recent) {
        return this.getWinScoreWithDeck(this.idDeck, recent)
      }
    }
  }

</script>

<style>


</style>
