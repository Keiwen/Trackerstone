<template>
    <div class="container">
        <h2>Serie</h2>
        <p>Rank: {{ rank }} - {{ rankTitle }} // Stars: {{ stars }} (Chest: {{ highest }})</p>
        <p>Next milestone: {{ nextMilestone}} - {{ milestoneTitle }} ({{ winsToMilestone }} wins needed)</p>
        <hr/>
        <div class="container">
            <div class="col-md-6">
                <h3>Current deck</h3>
                <deck-pick></deck-pick>
                <br/>
                <router-link :to="{ name: 'deckList' }">Manage decks</router-link>
            </div>
            <div class="col-md-6">
                <h3>Opponent deck</h3>
                <type-pick @pick-type="pickOpponentType" :initialPick="opponent"></type-pick>
            </div>
        </div>
        <div>
            <p>{{ gamesCurrentPlayedVs.length }} similar games played ({{ gamesCurrentWinpercentVs }} % won)</p>
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
    computed: {
      ...mapGetters(['rank', 'stars', 'highest', 'nextMilestone', 'winsToMilestone', 'gamesPlayed', 'gamesWon', 'winRate', 'current', 'opponent', 'recentNumberGames']),
      rankTitle () {
        return this.$store.getters.rankTitle()
      },
      gamesCurrentPlayedVs () {
        if (this.opponent === {}) return 0
        const gamesPlayedVs = this.$store.getters.getGamesFiltered(0, 'opponent.id', this.opponent.id)
        return gamesPlayedVs.filter(game => {
          return game.deck.id === this.current.id
        })
      },
      gamesCurrentWonVs () {
        const gamesCurrentPlayedVs = this.gamesCurrentPlayedVs
        return gamesCurrentPlayedVs.filter(game => {
          return game.won === true
        })
      },
      gamesCurrentWinpercentVs () {
        if (this.gamesCurrentPlayedVs.length === 0) return 0
        // round 2 digits
        const winRate = Math.round((this.gamesCurrentWonVs.length / this.gamesCurrentPlayedVs.length) * 100) / 100
        return parseInt(winRate * 100)
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
