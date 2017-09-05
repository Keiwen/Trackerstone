<template>
    <div class="container-fluid">
        <h3>Stats</h3>
        <p v-if="!isNewArena">{{ arenaGamesWonCurrent }} won / {{ arenaGamesLossCurrent }} loss ({{ arenaWinPercentCurrent }} % winrate)</p>
        <p v-else>0 won / 0 loss (0 % winrate)</p>
        <p>
            <win-loss v-for="(game, gameIndex) in currentGames" :game="game" :key="gameIndex" />
        </p>
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import WinLoss from './WinLoss'

  export default {
    components: {WinLoss},
    computed: {
      ...mapGetters(['arenaGamesWonCurrent', 'arenaGamesLossCurrent', 'arenaWinPercentCurrent', 'getArenaGamesList', 'arenaWin', 'arenaLoss']),
      currentGames () {
        if (this.isNewArena) return []
        return this.getArenaGamesList(true)
      },
      isNewArena () {
        return (this.arenaWin === 0 && this.arenaLoss === 0)
      }
    }
  }

</script>
