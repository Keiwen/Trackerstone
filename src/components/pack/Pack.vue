<template>
    <div>
        <div class="row cardPackSelect">
            <div class="form-group">
                <label for="currentSetSelect" class="control-label col-xs-3">Cardset:</label>
                <div class="col-xs-9">
                    <div v-if="isMobileDevice">
                        <select v-model="currentSet" id="currentSetSelect" class="form-control" >
                            <option v-for="option in Object.values(cardsetWithPack)" :value="option">{{ option.name }}</option>
                        </select>
                    </div>
                    <div v-else>
                        <v-select :options="Object.values(cardsetWithPack)" label="name" v-model="currentSet" id="currentSetSelect" >
                            <template slot="option" slot-scope="option">
                                <span class="icon"></span>
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>
                </div>
            </div>
        </div>

        <hr/>

        <div class="row cardsetStat">
            <div>
                <span>Pack opened</span>
                <span>{{ cardsetStat['opened'] }}</span>
                <span>{{ cardsetStat['opened'] * 5 }} cards</span>
            </div>
            <div class="rarity-common">
                <span>Common cards</span>
                <span>{{ cardsetStat['common'] }}</span>
                <span>{{ getRarityOpenedPercent('common') }} %</span>
            </div>
            <div class="rarity-rare">
                <span>Rare cards</span>
                <span>{{ cardsetStat['rare'] }}</span>
                <span>{{ getRarityOpenedPercent('rare') }} %</span>
            </div>
            <div class="rarity-epic">
                <span>Epic cards</span>
                <span>{{ cardsetStat['epic'] }}</span>
                <span>{{ getRarityOpenedPercent('epic') }} %</span>
            </div>
            <div class="rarity-legendary">
                <span>Legendary cards</span>
                <span>{{ cardsetStat['legendary'] }}</span>
                <span>{{ getRarityOpenedPercent('legendary') }} %</span>
            </div>
        </div>

        <button @click="openPack()" class="btn btn-default" id="openPackBtn">Open new card pack</button>

        <div class="row guaranteed-rarity">
            <div class="col-xs-6 rarity-epic">
                Epic card guaranteed in next
                <span class="guaranteed-counter">
                    {{ cardsetStat['nextEpicIn'] }} packs
                </span>
            </div>
            <div class="col-xs-6 rarity-legendary">
                Legendary card guaranteed in next
                <span class="guaranteed-counter">
                    {{ cardsetStat['nextLegendaryIn'] }} packs
                </span>
            </div>
        </div>

        <sweet-modal ref="modalOpenPack" modal-theme="dark" :title="currentSet.name + ' pack'">
            <div class="container rarityCounter">
                <div class="col-xs-3 rarity-common">
                    <h4>Common</h4>
                    <div>{{ packOpenCommon }}</div>
                </div>
                <div class="col-xs-3 rarity-rare">
                    <h4>Rare</h4>
                    <integer-plusminus :vertical="true" v-model="packOpenRare"
                                       @ipm-increment="adjustPackOpenCounters('rare', true)"
                                       @ipm-decrement="adjustPackOpenCounters('rare', false)"
                                       :min="minRareCard" :max="5"></integer-plusminus>
                </div>
                <div class="col-xs-3 rarity-epic">
                    <h4>Epic</h4>
                    <integer-plusminus :vertical="true" v-model="packOpenEpic"
                                       @ipm-increment="adjustPackOpenCounters('epic', true)"
                                       @ipm-decrement="adjustPackOpenCounters('epic', false)"
                                       :min="0" :max="5"></integer-plusminus>
                </div>
                <div class="col-xs-3 rarity-legendary">
                    <h4>Legendary</h4>
                    <integer-plusminus :vertical="true" v-model="packOpenLegendary"
                                       @ipm-increment="adjustPackOpenCounters('legendary', true)"
                                       @ipm-decrement="adjustPackOpenCounters('legendary', false)"
                                       :min="0" :max="5"></integer-plusminus>
                </div>
            </div>

            <button slot="button" @click="cancelOpenPack()" class="btn btn-default">Cancel <icon name="times" /></button>
            <button slot="button" @click="confirmOpenPack()" class="btn btn-success">Save <icon name="save" /></button>
        </sweet-modal>


    </div>
</template>


<script>
  import * as storeMut from '@/store/mutation-types'
  import { mapGetters } from 'vuex'
  import { SweetModal } from 'sweet-modal-vue'
  import { IntegerPlusminus } from 'vue-integer-plusminus'

  export default {
    components: {SweetModal, IntegerPlusminus},
    data () {
      return {
        currentSet: {},
        packOpenCommon: 4,
        packOpenRare: 1,
        packOpenEpic: 0,
        packOpenLegendary: 0
      }
    },
    computed: {
      ...mapGetters(['cardsetWithPack', 'getCardsetStat']),
      minRareCard () {
        // max 4 common, at least 1 rare or above.
        if (this.packOpenCommon === 4 && this.packOpenEpic === 0 && this.packOpenLegendary === 0) {
          return 1
        }
        return 0
      },
      isMobileDevice () {
        return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1)
      },
      cardsetStat () {
        return this.getCardsetStat(this.currentSet.key)
      }
    },
    mounted () {
      if (this.cardsetWithPack['cla']) {
        this.currentSet = this.cardsetWithPack['cla']
      }
    },
    methods: {
      openPack () {
        this.resetPackCounters()
        this.$refs.modalOpenPack.open()
      },
      cancelOpenPack () {
        this.$refs.modalOpenPack.close()
      },
      confirmOpenPack () {
        const payload = {
          cardset: this.currentSet.key,
          common: this.packOpenCommon,
          rare: this.packOpenRare,
          epic: this.packOpenEpic,
          legendary: this.packOpenLegendary
        }
        this.$store.commit(storeMut.OPEN_PACK, payload)
        this.$refs.modalOpenPack.close()
      },
      resetPackCounters () {
        this.packOpenCommon = 4
        this.packOpenRare = 1
        this.packOpenEpic = 0
        this.packOpenLegendary = 0
      },
      adjustPackOpenCounters (rarity, incremented) {
        if (incremented) {
          if (this.packOpenCommon > 0) {
            this.packOpenCommon--
          } else if (this.packOpenRare > 0 && rarity !== 'rare') {
            this.packOpenRare--
          } else if (this.packOpenEpic > 0 && rarity !== 'epic') {
            this.packOpenEpic--
          } else {
            this.packOpenLegendary--
          }
        } else {
          if (this.packOpenCommon === 4) {
            // cannot have 5 common
            this.$nextTick(() => {
              // use next tick in case of rare modified
              this.packOpenRare = this.minRareCard
            })
          } else {
            this.packOpenCommon++
          }
        }
      },
      getRarityOpenedPercent (rarity) {
        if (!this.cardsetStat['opened']) return 0
        const ratio = this.cardsetStat[rarity] / (this.cardsetStat['opened'] * 5)
        // round with 2 digits
        return Math.round(ratio * 10000) / 100
      }
    }
  }
</script>

<style lang="scss">
    h4 {
        margin-top: 0;
    }

    .cardPackSelect {
        padding-top: 10px;
        padding-bottom: 15px;
    }

    .rarityCounter {
        .rarity-common > div {
            font-size: 2em;
            margin-top: 65px;
        }
        margin-bottom: 20px;
    }

    .guaranteed-rarity {
        span.guaranteed-counter {
            font-size: 1.5em;
            display: block;
        }
    }

    .cardsetStat {
        display: table;
        width: 100%;
        margin: auto;
        > div {
            display: table-cell;
            span:nth-child(2) {
                font-size: 1.5em;
                display: block;
            }
            span:nth-child(3) {
                font-style: italic;
                &:before { content: '(' }
                &:after { content: ')' }
            }
        }
    }

    #openPackBtn {
        margin: 20px 0;
    }

</style>
