<template>
    <div class="container-fluid">
        <h3>Stats</h3>
        <p>Global: {{ gamesWon }} - {{ gamesLoss }} ({{ winPercent }} % winrate)</p>
        <p>
            Last {{ recentGames.length }} games: {{ gamesWonRecent }} - {{ gamesLossRecent }} ({{ winPercentRecent }} % winrate)
            <win-loss v-for="(game, gameIndex) in recentGames" :game="game" :key="gameIndex" />
        </p>
        <see-chart-button routeName="serieChart" />
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import WinLoss from './WinLoss'
  import SeeChartButton from '@/components/charts/SeeChartButton'

  export default {
    components: {WinLoss, SeeChartButton},
    computed: {
      ...mapGetters(['gamesPlayed', 'gamesWon', 'gamesLoss', 'winPercent', 'getGamesList', 'gamesWonRecent', 'gamesLossRecent', 'winPercentRecent']),
      recentGames () {
        return this.getGamesList(true)
      }
    }
  }
</script>
