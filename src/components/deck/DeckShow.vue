<template>
    <div class="deckShow" :class="showDivClass">
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
                <label for="newNote" class="control-label col-xs-4">Note:</label>
                <div class="col-xs-8">
                    <textarea id="newNote" rows="3" col="50" class="form-control" v-model="newNote"/>
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
        clipboardSuccess: false,
        wildFormat: true
      }
    },
    computed: {
      ...mapGetters(['generateDeckTitle', 'generateDeckTitleLimit', 'lastDeckChanged']),
      showDivClass () {
        let divClass = 'deckClass-' + this.deck.type.hsClass
        divClass += ' deckSerie-' + this.deck.serie
        if (this.lastDeckChanged === this.deck.id) {
          divClass += ' lastChange'
        }
        return divClass
      }
    },
    methods: {
      openDetail () {
        this.newName = this.deck.name
        this.newNote = this.deck.note
        this.newExportCode = this.deck.exportCode
        this.wildFormat = (this.deck.serie === 'wild')
        this.$refs.modalDetail.open()
      },
      confirmEdit () {
        this.$store.commit(storeMut.SET_DECK, {
          id: this.deck.id,
          name: this.newName,
          note: this.newNote,
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
        .deckClass {
            &-druid .profil {
                background-position: -375px -376px;
            }

            &-hunter .profil {
                background-position: -75px -75px;
            }

            &-mage .profil {
                background-position: -75px -375px;
            }

            &-paladin .profil {
                background-position: -675px -375px;
            }

            &-priest .profil {
                background-position: -75px -675px;
            }

            &-rogue .profil {
                background-position: -675px -675px;
            }

            &-shaman .profil {
                background-position: -675px -75px;
            }

            &-warlock .profil {
                background-position: -375px -75px;
            }

            &-warrior .profil {
                background-position: -375px -675px;
            }
        }
    }

</style>
