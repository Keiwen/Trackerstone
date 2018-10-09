<template>
    <div class="deckShow" :class="showDivClass" :style="scssVar">
        <div class="row" @click="openDetail()">
            <div class="col-xs-3">
                <div class="profil"></div>
            </div>

            <div class="col-xs-9">
                <div class="row">
                    <div class="col-xs-12">
                        <h4>
                            {{ generateDeckTitleLimit(deck) }}
                        </h4>
                    </div>
                </div>
                <div class="col-xs-12 deckStats">
                    <div class="row">
                        <div class="col-xs-12">
                            <p>
                                {{ deck.wonWith }} - {{ deck.lossWith }}<br/>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <sweet-modal ref="modalDetail" modal-theme="dark" :title="generateDeckTitle(deck)">
            <div class="row detailStats">
                <div class="col-xs-6">
                    <p>
                        Record: {{ deck.wonWith }} - {{ deck.lossWith }}<br/>
                        <span class="score">
                            Score: {{ deck.winScoreWith }}
                        </span>
                    </p>
                </div>
                <div class="col-xs-6">
                    <p>
                        {{ deck.winPercentWith }} % global<br/>
                        {{ deck.winPercentWithRecent }} % last {{ deck.playedWithRecent }} games
                    </p>
                </div>
            </div>
            <hr/>
            <div class="form-group form-group-double">
                <label class="control-label col-xs-4" for="newName">Name:</label>
                <div class="col-xs-5 first-form-field">
                    <input type="text" id="newName" class="form-control" v-model="newName" @keyup.enter="confirmEdit()"/>
                </div>
                <div class="col-xs-3">
                    <enhanced-check v-model="wildFormat" label="Wild" :animate="true" subClass="wild" />
                </div>
            </div>
            <div class="form-group">
                <label for="newExportCode" class="control-label col-xs-4">Export code:</label>
                <div class="input-group col-xs-8">
                    <input type="text" id="newExportCode" class="form-control"
                           v-model="newExportCode" @keyup.enter="confirmEdit()"
                           aria-describedby="deckEdit-copy"/>
                    <span class="input-group-btn">
                        <button type="button"
                                v-clipboard:copy="newExportCode"
                                v-clipboard:success="onClipboardSuccess"
                                v-tooltip.notrigger.bottom="{ content: 'Copied!', visible: clipboardSuccess }">
                            <icon name="clipboard" />
                        </button>
                    </span>
                </div>
            </div>
            <div class="form-group">
                <label for="newRCard" class="control-label col-xs-4">Representative card:</label>
                <div class="input-group col-xs-8">
                    <input type="text" id="newRCard" class="form-control"
                           v-model="newRCard" @keyup.enter="confirmEdit()"/>
                    <span class="input-group-btn">
                    </span>
                </div>
            </div>
            <div class="form-group">
                <label for="newNote" class="control-label col-xs-4">Note:</label>
                <div class="col-xs-8">
                    <textarea id="newNote" rows="2" col="50" class="form-control" v-model="newNote"/>
                </div>
            </div>

            <button slot="button" @click="promptConfirmDelete()" class="btn btn-danger away-button">Delete <icon name="trash" /></button>

            <button slot="button" @click="cancelEdit()" class="btn btn-default">Cancel <icon name="times" /></button>
            <button slot="button" @click="confirmEdit()" class="btn btn-success">Save <icon name="save" /></button>
        </sweet-modal>

        <sweet-modal icon="warning" ref="modalDelete" modal-theme="dark">
            Are you sure you want to remove deck {{ generateDeckTitle(deck) }}?
            <button slot="button" @click="cancelRemove()" class="btn btn-default">Cancel <icon name="times" /></button>
            <button slot="button" @click="remove()" class="btn btn-success">Confirm <icon name="trash" /></button>
        </sweet-modal>

    </div>
</template>


<script>
  import * as storeMut from '@/store/mutation-types'
  import { SweetModal } from 'sweet-modal-vue'
  import { mapGetters } from 'vuex'
  import { EnhancedCheck } from 'vue-enhanced-check'

  export default {
    components: { SweetModal, EnhancedCheck },
    props: ['deck'],
    data () {
      return {
        newName: '',
        newNote: '',
        newExportCode: '',
        newRCard: '',
        clipboardSuccess: false,
        wildFormat: true
      }
    },
    computed: {
      ...mapGetters(['generateDeckTitle', 'generateDeckTitleLimit', 'lastDeckChanged', 'myHeroForClass']),
      showDivClass () {
        let divClass = 'deckHero-' + this.myHeroForClass(this.deck.type.hsClass)
        divClass += ' deckSerie-' + this.deck.serie
        if (this.lastDeckChanged === this.deck.id) {
          divClass += ' lastChange'
        }
        if (this.hasRepresentCard) {
          divClass += ' deckCardBackground'
        }
        return divClass
      },
      scssVar () {
        if (!this.hasRepresentCard) {
          return {}
        }
        return {
          '--sampleCard': 'url(https://art.hearthstonejson.com/v1/tiles/' + this.deck.representCard + '.png)'
        }
      },
      hasRepresentCard () {
        return this.deck.representCard !== undefined && this.deck.representCard !== ''
      }
    },
    methods: {
      openDetail () {
        this.newName = this.deck.name
        this.newNote = this.deck.note
        this.newRCard = this.deck.representCard
        this.newExportCode = this.deck.exportCode
        this.wildFormat = (this.deck.serie === 'wild')
        this.$refs.modalDetail.open()
      },
      confirmEdit () {
        this.$store.commit(storeMut.SET_DECK, {
          id: this.deck.id,
          name: this.newName,
          note: this.newNote,
          representCard: this.newRCard,
          exportCode: this.newExportCode,
          serie: this.wildFormat ? 'wild' : 'standard'
        })
        this.$refs.modalDetail.close()
      },
      cancelEdit () {
        this.$refs.modalDetail.close()
      },
      onClipboardSuccess () {
        this.clipboardSuccess = true
        setTimeout(this.onClipboardOut, 1000)
      },
      onClipboardOut () {
        this.clipboardSuccess = false
      },
      promptConfirmDelete () {
        this.$refs.modalDelete.open()
      },
      remove () {
        this.$refs.modalDelete.close()
        this.$refs.modalDetail.close()
        this.$store.commit(storeMut.REMOVE_DECK, this.deck.id)
      },
      cancelRemove () {
        this.$refs.modalDelete.close()
      }
    }
  }
</script>

<style lang="scss">
    .deckContainer {
        .deckShow {
            .profil {
                background: url('../../assets/classes_sprite.png') 0 0 no-repeat;
            }
        }
        .deckHero {
            &-rexxar .profil {
                background-position: -75px -75px;
            }
            &-guldan .profil {
                background-position: -375px -75px;
            }
            &-thrall .profil {
                background-position: -675px -75px;
            }
            &-jaina .profil {
                background-position: -75px -375px;
            }
            &-malfurion .profil {
                background-position: -375px -376px;
            }
            &-uther .profil {
                background-position: -675px -375px;
            }
            &-anduin .profil {
                background-position: -75px -675px;
            }
            &-garrosh .profil {
                background-position: -375px -675px;
            }
            &-valeera .profil {
                background-position: -675px -675px;
            }
            &-alleria .profil {
                background-position: -675px -975px;
            }
            &-khagdar .profil {
                background-position: -75px -1275px;
            }
            &-medivh .profil {
                background-position: -375px -1275px;
            }
            &-liadrin .profil {
                background-position: -675px -1275px;
            }
            &-arthas .profil {
                background-position: -75px -1575px;
            }
            &-tyrande .profil {
                background-position: -375px -1575px;
            }
            &-maeiv .profil {
                background-position: -675px -1575px;
            }
            &-morgl .profil {
                background-position: -75px -1875px;
            }
            &-nemsy .profil {
                background-position: -375px -1875px;
            }
            &-magni .profil {
                background-position: -675px -1875px;
            }
            &-lunara .profil {
                background-position: -75px -2175px;
            }
            &-jaraxxus .profil {
                background-position: -375px -2175px;
            }
        }
    }


    .deckCardBackground {
        &:before {
            background-image: var(--sampleCard)
        }
    }


</style>
