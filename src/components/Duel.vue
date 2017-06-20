<template>
    <div class="container">
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
        <button @click="win()" class="btn btn-success">Win <icon name="thumbs-up" /></button>
        <button @click="loose()" class="btn btn-warning">Loss <icon name="thumbs-down" /></button>
    </div>
</template>


<script>
  import * as storeMut from '../store/mutation-types'
  import { mapGetters, mapActions } from 'vuex'
  import DeckPick from '@/components/DeckPick'
  import TypePick from '@/components/TypePick'

  export default {
    components: {DeckPick, TypePick},
    computed: {
      ...mapGetters(['gamesPlayed', 'winRate', 'current', 'opponent']),
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
      }
    },
    methods: {
      ...mapActions(['win', 'loose']),
      pickOpponentType (type) {
        this.$store.commit(storeMut.CHOOSE_OPPONENT, type)
      }
    }
  }

</script>
