<template>
    <div>
        <h4>{{ deck.name }} ({{ getClassName(deck.type.hsClass) }} {{ deck.type.name }})</h4>
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

  export default {
    props: ['deck', 'idDeck'],
    methods: {
      getClassName (id) {
        return this.$store.getters.className(id)
      },
      getDeckGamesPlayedCount (recent) {
        return this.$store.getters.getGamesWithDeck(this.idDeck, recent).length
      },
      getDeckGamesWonCount (recent) {
        return this.$store.getters.getGamesWonWithDeck(this.idDeck, recent).length
      },
      getDeckWinPercent (recent) {
        return this.$store.getters.getWinPercentWithDeck(this.idDeck, recent)
      },
      getDeckWinScore (recent) {
        return this.$store.getters.getWinScoreWithDeck(this.idDeck, recent)
      }
    }
  }

</script>

<style>


</style>
