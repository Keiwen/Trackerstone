<template>
    <span>
        {{ deck.name }} ({{ getClassName(deck.type.hsClass) }} {{ deck.type.name }})
        -
        Won {{ getDeckGamesWon() }} / {{ getDeckGamesPlayed() }} ({{ getDeckWinPercent() }} % global, {{ getDeckWinPercent(true) }} % last {{ recentNumberGames }} games)
    </span>
</template>


<script>

  import { mapGetters } from 'vuex'

  export default {
    props: ['deck'],
    computed: {
      ...mapGetters(['recentNumberGames'])
    },
    methods: {
      getClassName (id) {
        return this.$store.getters.className(id)
      },
      getDeckGames (recent) {
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
