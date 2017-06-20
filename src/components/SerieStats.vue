<template>
    <div class="container">
        <h3>Stats</h3>
        <p>Global: {{ gamesWon }} won / {{ gamesPlayed }} played ({{ winPercent }} % winrate)</p>
        <p>
            Last {{ recentNumberGames }} games: {{ recentGamesWon }} won ({{ recentWinPercent }} % winrate)
            <win-loss v-for="(game, gameIndex) in recentGames" :game="game" :key="gameIndex" />
        </p>
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import WinLoss from '@/components/WinLoss'

  export default {
    components: {WinLoss},
    computed: {
      ...mapGetters(['gamesPlayed', 'gamesWon', 'winRate', 'recentNumberGames']),
      winPercent () {
        return parseInt(this.winRate * 100)
      },
      recentGames () {
        return this.$store.getters.getGamesFiltered(this.recentNumberGames)
      },
      recentGamesPlayed () {
        return this.recentGames.length
      },
      recentGamesWon () {
        return this.$store.getters.getGamesFiltered(this.recentNumberGames, 'won').length
      },
      recentWinPercent () {
        if (this.recentGamesPlayed === 0) return 0
        return Math.round((this.recentGamesWon / this.recentGamesPlayed) * 100)
      }
    }
  }

</script>
