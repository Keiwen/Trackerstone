<template>
    <span>
        {{ deck.name }} ({{ getClassName(deck.type.hsClass) }} {{ deck.type.name }})
        -
        Won {{ getDeckGamesWon() }} / {{ getDeckGamesPlayed() }} ({{ getDeckWinPercent() }} % global, {{ getDeckWinPercent(true) }} % last {{ getDeckGamesPlayed(true) }} games)
    </span>
</template>


<script>

  import { mapGetters } from 'vuex'

  export default {
    props: ['deck', 'idDeck'],
    computed: {
      ...mapGetters(['recentNumberGames']),
      idDeckComputed () {
        return parseInt(this.idDeck)
      }
    },
    methods: {
      getClassName (id) {
        return this.$store.getters.className(id)
      },
      getDeckGames (recent) {
        if (recent) {
          return this.$store.getters.getLastGamesFiltered(this.recentNumberGames, 'deck.id', this.idDeckComputed)
        }
        return this.$store.getters.getGamesFiltered(0, 'deck.id', this.idDeckComputed)
      },
      getDeckGamesPlayed (recent) {
        return this.getDeckGames(recent).length
      },
      getDeckGamesWon (recent) {
        const games = this.getDeckGames(recent)
        const wons = games.filter(game => {
          return game['won'] === true
        })
        return wons.length
      },
      getDeckWinPercent (recent) {
        if (this.getDeckGamesPlayed(recent) === 0) return 0
        return Math.round((this.getDeckGamesWon(recent) / this.getDeckGamesPlayed(recent)) * 100)
      }
    }
  }

</script>
