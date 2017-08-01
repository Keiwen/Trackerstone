<template>
    <div class="container-fluid">
        <div class="container">
            <div class="col-md-6">
                <h3>Current deck</h3>
                <deck-pick/>
                <br/>
                <router-link :to="{ name: 'deckList' }">Manage decks</router-link>
            </div>
            <div class="col-md-6">
                <h3>Opponent deck</h3>
                <type-pick @pick-type="pickOpponentType" :initialPick="opponent" />
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
  import * as storeMut from '@/store/mutation-types'
  import { mapGetters, mapActions } from 'vuex'
  import DeckPick from '@/components/deck/DeckPick'
  import TypePick from '@/components/deck/TypePick'

  export default {
    components: {DeckPick, TypePick},
    computed: {
      ...mapGetters(['gamesPlayed', 'winRate', 'current', 'opponent']),
      gamesCurrentPlayedVs () {
        if (this.opponent === {}) return 0
        const gamesPlayedVs = this.$store.getters.getGamesVsType(this.opponent.id)
        return gamesPlayedVs.filter(game => {
          return game.deck.id === this.current.id
        })
      },
      gamesCurrentWonVs () {
        if (this.opponent === {}) return 0
        const gamesWonVs = this.$store.getters.getGamesWonVsType(this.opponent.id)
        return gamesWonVs.filter(game => {
          return game.deck.id === this.current.id
        })
      },
      gamesCurrentWinpercentVs () {
        return this.$store.getters.computeWinPercent(this.gamesCurrentPlayedVs.length, this.gamesCurrentWonVs.length)
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
