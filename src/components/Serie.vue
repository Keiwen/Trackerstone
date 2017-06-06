<template>
    <div class="container">
        <h2>Serie</h2>
        <p>Rank: {{ rank }} - {{ rankTitle }} // Stars: {{ stars }} (Chest: {{ highest }})</p>
        <p>Next milestone: {{ nextMilestone}} - {{ milestoneTitle }} ({{ winsToMilestone }} wins needed)</p>
        <hr/>
        <div>
            <h3>Current deck</h3>
            <deck-pick></deck-pick>
            <br/>
            <router-link :to="{ name: 'deckList' }">Manage decks</router-link>
        </div>
        <br/>
        <button @click="win()">Win</button>
        <button @click="loose()">Loss</button>
        <br/><br/>
        <h2>Stats</h2>
        <p>Global: {{ gamesWon }} won / {{ gamesPlayed }} played ({{ winPercent }} % winrate)</p>
        <p>
            Last {{ recentNumberGames }} games: {{ recentGamesWon }} won ({{ recentWinPercent }} % winrate)
            <win-loss v-for="game in recentGames" :game="game"></win-loss>
        </p>
        <hr/>
        <button @click="reset()">Reset</button>
    </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import DeckPick from '@/components/DeckPick'
  import WinLoss from '@/components/WinLoss'

  export default {
    components: {DeckPick, WinLoss},
    data () {
      return {
        recentNumberGames: 10
      }
    },
    computed: {
      ...mapGetters(['rank', 'stars', 'highest', 'nextMilestone', 'winsToMilestone', 'gamesPlayed', 'gamesWon', 'winRate']),
      rankTitle () {
        return this.$store.getters.rankTitle()
      },
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
      },
      milestoneTitle () {
        return this.$store.getters.rankTitle(this.nextMilestone)
      }
    },
    methods: {
      ...mapActions(['win', 'loose', 'reset'])
    }
  }

</script>
