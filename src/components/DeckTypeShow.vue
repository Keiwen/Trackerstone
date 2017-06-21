<template>
    <span>
        {{ getClassName(type.hsClass) }} {{ type.name }} ({{ type.archetype }})
        <icon name="star" v-if="type.top" />
        -
        Won {{ getGamesWonVs() }} / {{ getGamesPlayedVs() }} against ({{ getWinPercentVs() }} % global, {{ getWinPercentVs(true) }} % last {{ getGamesPlayedVs(true) }} games)
    </span>
</template>


<script>

  import { mapGetters } from 'vuex'

  export default {
    props: ['type'],
    computed: {
      ...mapGetters(['recentNumberGames'])
    },
    methods: {
      getClassName (id) {
        return this.$store.getters.className(id)
      },
      getGamesVs (recent) {
        if (recent) {
          return this.$store.getters.getLastGamesFiltered(this.recentNumberGames, 'opponent.id', this.type.id)
        }
        return this.$store.getters.getGamesFiltered(0, 'opponent.id', this.type.id)
      },
      getGamesPlayedVs (recent) {
        return this.getGamesVs(recent).length
      },
      getGamesWonVs (recent) {
        const games = this.getGamesVs(recent)
        const wons = games.filter(game => {
          return game['won'] === true
        })
        return wons.length
      },
      getWinPercentVs (recent) {
        if (this.getGamesPlayedVs(recent) === 0) return 0
        return Math.round((this.getGamesWonVs(recent) / this.getGamesPlayedVs(recent)) * 100)
      }
    }
  }

</script>
