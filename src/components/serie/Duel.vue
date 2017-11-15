<template>
    <div class="container-fluid">
        <div class="container">
            <div class="col-xs-6">
                <h3>Current deck</h3>
                <deck-pick/>
                <span @click="showDeckNote()">
                    <icon name="info-circle" :scale="2" class="infoNote" :class="{'noted': current.note}"></icon>
                </span>

                <sweet-modal ref="modalDeckNote" modal-theme="dark" title="Deck note">
                    <pre v-if="current.note">{{ current.note }}</pre>
                    <p v-else><i>No note stored for this deck</i></p>
                </sweet-modal>

            </div>
            <div class="col-xs-6">
                <h3>Opponent deck</h3>
                <deck-type-pick @pick-type="pickOpponentType" :initialPick="opponent" />
                <span @click="showNote()">
                    <icon name="info-circle" :scale="2" class="infoNote" :class="{'noted': opponent.note}"></icon>
                </span>

                <sweet-modal ref="modalNote" modal-theme="dark" title="Deck type note">
                    <pre v-if="opponent.note">{{ opponent.note }}</pre>
                    <p v-else><i>No note stored for this deck type</i></p>
                </sweet-modal>

            </div>
        </div>
        <div class="container">
            <p>Similar games played: {{ gamesCurrentWonVs.length }} - {{ gamesCurrentLossVsCount }} ({{ gamesCurrentWinpercentVs }} % won)</p>
        </div>

        <div class="duelButtons">
            <button @click="win()" class="btn btn-success">Win <icon name="thumbs-up" /></button>
            <button @click="loose()" class="btn btn-warning">Loss <icon name="thumbs-down" /></button>
        </div>
    </div>
</template>


<script>
  import * as storeMut from '@/store/mutation-types'
  import { mapGetters, mapActions } from 'vuex'
  import DeckPick from '@/components/deck/DeckPick'
  import DeckTypePick from '@/components/deck/DeckTypePick'
  import { SweetModal } from 'sweet-modal-vue'

  export default {
    components: {DeckPick, DeckTypePick, SweetModal},
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
      gamesCurrentLossVsCount () {
        return this.gamesCurrentPlayedVs.length - this.gamesCurrentWonVs.length
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
      showDeckNote () {
        this.$refs.modalDeckNote.open()
      },
      showNote () {
        this.$refs.modalNote.open()
      }
    }
  }
</script>

<style lang="scss">
    .duelButtons {
        margin-top: 10px;
        button {
            margin-left: 20px;
            margin-right: 20px;
        }
    }

    .infoNote {
        cursor: pointer;
    }
</style>
