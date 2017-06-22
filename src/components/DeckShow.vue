<template>
    <span>
        {{ deck.name }} ({{ getClassName(deck.type.hsClass) }} {{ deck.type.name }})
        -
        Won {{ getDeckGamesWonCount() }} / {{ getDeckGamesPlayedCount() }} ({{ getDeckWinPercent() }} % global, {{ getDeckWinPercent(true) }} % last {{ getDeckGamesPlayedCount(true) }} games)
    </span>
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
      }
    }
  }

</script>
