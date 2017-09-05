<template>
    <div class="container-fluid">
        <h2>Arena</h2>
        <p>Completed: {{ arenaPlayed }} - average {{ arenaAverageWin }} won (max reached: {{ arenaMaxWin }})</p>
        <p>{{ arenaGamesWon }} total games won, {{ arenaGamesLoss }} loose ({{ arenaWinPercent }} % winrate)</p>
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['arenaGamesWon', 'arenaGamesLoss', 'arenaWinPercent', 'arenaPlayed', 'arenaAverageWin', 'arenaMaxWin'])
    }
  }

</script>
