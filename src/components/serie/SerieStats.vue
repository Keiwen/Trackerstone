<template>
    <div class="container-fluid">
        <h3>Stats</h3>
        <p>Global: {{ gamesWon }} won / {{ gamesPlayed }} played ({{ winPercent }} % winrate)</p>
        <p>
            Last {{ recentGames.length }} games: {{ gamesWonRecent }} won ({{ winPercentRecent }} % winrate)
            <win-loss v-for="(game, gameIndex) in recentGames" :game="game" :key="gameIndex" />
        </p>
        <router-link :to="{ name: 'serieChart' }">See chart</router-link>
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import WinLoss from './WinLoss'

  export default {
    components: {WinLoss},
    computed: {
      ...mapGetters(['gamesPlayed', 'gamesWon', 'winPercent', 'getGamesList', 'gamesWonRecent', 'winPercentRecent']),
      recentGames () {
        return this.getGamesList(true)
      }
    }
  }

</script>
