<template>
    <div class="container-fluid">
        <div class="container">
            <div class="col-xs-6">
                <h3>My deck</h3>
                <div class="row">
                    <deck-pick/>
                    <span @click="showDeckNote()" class="deckNote">
                        <icon-info :noted="typeof current.note !== 'undefined' && current.note.length > 0" :before="true"></icon-info>
                    </span>
                </div>

                <sweet-modal ref="modalDeckNote" modal-theme="dark" :title="generateDeckTitle(current)">
                    <pre v-if="current.note">{{ current.note }}</pre>
                    <p v-else><i>No note stored for this deck</i></p>
                </sweet-modal>

            </div>
            <div class="col-xs-6">
                <h3>Opponent deck</h3>
                <div class="row">
                    <deck-type-pick @pick-type="pickOpponentType" :initialPick="opponent.id" :allowGenericPick="true"/>
                    <span @click="showNote()" class="deckTypeNote">
                        <icon-info :noted="typeof opponent.note !== 'undefined' && opponent.note.length > 0"></icon-info>
                    </span>
                </div>

                <sweet-modal ref="modalNote" modal-theme="dark" :title="generateTypeTitle(opponent)">
                    <pre v-if="opponent.note">{{ opponent.note }}</pre>
                    <p v-else><i>No note stored for this deck type</i></p>
                </sweet-modal>

            </div>
        </div>

        <div class="duelButtons">
            <button @click="playedDuel(true)" class="btn btn-success">Win <icon name="thumbs-up" /></button>
            <button @click="playedDuel(false)" class="btn btn-warning">Loss <icon name="thumbs-down" /></button>
        </div>

        <div class="container">
            <div class="col-xs-6">
            <span class="text-danger winstreakIcon" v-if="isOnWinStreak">
                <icon name="fire" /> Win streak
            </span>
            </div>
            <div class="col-xs-6">
                <p class="small">Similar games played: {{ gamesCurrentWonVs.length }} - {{ gamesCurrentLossVsCount }} ({{ gamesCurrentWinpercentVs }} % won)</p>
            </div>
        </div>
    </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import DeckPick from '@/components/deck/DeckPick'
  import DeckTypePick from '@/components/deck/DeckTypePick'
  import { SweetModal } from 'sweet-modal-vue'
  import IconInfo from '@/components/singleElements/IconInfo'

  export default {
    components: {DeckPick, DeckTypePick, SweetModal, IconInfo},
    computed: {
      ...mapGetters([
        'current', 'opponent', 'getGamesVsType', 'getGamesWonAmong', 'wildMode',
        'computeWinPercent', 'isOnWinStreak', 'generateTypeTitle', 'generateDeckTitle'
      ]),
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
      ...mapActions(['win', 'loose', 'chooseOpponent']),
      pickOpponentType (type) {
        this.chooseOpponent(type)
      },
      playedDuel (won) {
        this.$ga.event('history', 'add', this.wildMode ? 'wild' : 'standard')
        won ? this.win() : this.loose()
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

<style lang="scss" scoped>
    .duelButtons {
        button {
            margin-left: 20px;
            margin-right: 20px;
        }

        .btn-success {
            padding-right: 30px;
            position: relative;

            svg {
                position: absolute;
                top: 6px;
                right: 7px;
            }
        }

        .btn-warning {
            padding-right: 30px;
            position: relative;

            svg {
                position: absolute;
                top: 8px;
                right: 7px;
            }
        }
    }

    .winstreakIcon {
        display: inline-block;
    }

    .deckNote {
        float: left;
    }

    .deckTypeNote {
        float: right;
    }

</style>
