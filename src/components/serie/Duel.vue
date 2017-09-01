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
                <span @click="showNote()">
                    <icon name="info-circle" :scale="2" class="infoNote" :class="{'noted': opponent.note}"></icon>
                </span>

                <sweet-modal ref="modalNote" modal-theme="dark" title="Deck type note">
                    <pre v-if="opponent.note">{{ opponent.note }}</pre>
                    <p v-else><i>No note stored for this deck type</i></p>
                </sweet-modal>

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
  import { SweetModal } from 'sweet-modal-vue'

  export default {
    components: {DeckPick, TypePick, SweetModal},
    computed: {
      ...mapGetters(['current', 'opponent', 'getGamesVsType', 'getGamesWonAmong', 'computeWinPercent']),
      gamesCurrentPlayedVs () {
        if (this.opponent === {}) return []
        const gamesPlayedVs = this.getGamesVsType(this.opponent.id)
        return gamesPlayedVs.filter(game => {
          return game.deck.id === this.current.id
        })
      },
      gamesCurrentWonVs () {
        if (this.opponent === {}) return []
        return this.getGamesWonAmong(this.gamesCurrentPlayedVs)
      },
      gamesCurrentWinpercentVs () {
        return this.computeWinPercent(this.gamesCurrentPlayedVs.length, this.gamesCurrentWonVs.length)
      }
    },
    methods: {
      ...mapActions(['win', 'loose']),
      pickOpponentType (type) {
        this.$store.commit(storeMut.CHOOSE_OPPONENT, type)
      },
      showNote () {
        this.$refs.modalNote.open()
      }
    }
  }

</script>
