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
        <div>
            <h3>Opponent deck</h3>
            <type-pick @pick-type="pickOpponentType"></type-pick>
        </div>
        <br/>
        <button @click="win()" class="btn btn-success">Win <icon name="thumbs-up" /></button>
        <button @click="loose()" class="btn btn-warning">Loss <icon name="thumbs-down" /></button>
        <br/><br/>
        <h3>Stats</h3>
        <p>Global: {{ gamesWon }} won / {{ gamesPlayed }} played ({{ winPercent }} % winrate)</p>
        <p>
            Last {{ recentNumberGames }} games: {{ recentGamesWon }} won ({{ recentWinPercent }} % winrate)
            <win-loss v-for="(game, gameIndex) in recentGames" :game="game" :key="gameIndex"></win-loss>
        </p>
        <hr/>
        <button @click="reset()" class="btn btn-danger">Reset</button>
    </div>
</template>


<script>
  import * as storeMut from '../store/mutation-types'
  import { mapGetters, mapActions } from 'vuex'
  import DeckPick from '@/components/DeckPick'
  import TypePick from '@/components/TypePick'
  import WinLoss from '@/components/WinLoss'

  export default {
    components: {DeckPick, TypePick, WinLoss},
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
      ...mapActions(['win', 'loose', 'reset']),
      pickOpponentType (type) {
        this.$store.commit(storeMut.CHOOSE_OPPONENT, type)
      }
    }
  }

</script>
