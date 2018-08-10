<template>
    <div class="deckShow" :class="showDivClass" @click="toggleActions()">
        <div class="row">
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

        <div class="col-xs-12 deckActions" v-if="showActions">
            <div class="col-xs-6">
                <button slot="button" class="btn btn-info" @click="editDeck()">Edit</button>
            </div>
            <div class="col-xs-6">
                <button slot="button" class="btn btn-danger" @click="promptConfirmDelete()">Delete</button>
            </div>
        </div>

        <sweet-modal ref="modalEdit" modal-theme="dark" :title="generateDeckTitle(deck)">
            <div class="row">
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
            <div class="form-group">
                <label class="control-label col-xs-4" for="newName">Name:</label>
                <div class="col-xs-8">
                    <input type="text" id="newName" class="form-control" v-model="newName" @keyup.enter="confirmEdit()"/>
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
                    <textarea id="newNote" rows="2" col="50" class="form-control" v-model="newNote"/>
                </div>
            </div>
            <button slot="button" @click="confirmEdit()" class="btn btn-success">Save <icon name="save" /></button>
            <button slot="button" @click="cancelEdit()" class="btn btn-default">Cancel <icon name="times" /></button>
        </sweet-modal>

        <sweet-modal icon="warning" ref="modalDelete" modal-theme="dark">
            Are you sure you want to remove deck {{ generateDeckTitle(deck) }}?
            <button slot="button" @click="remove()" class="btn btn-success">Confirm <icon name="trash" /></button>
            <button slot="button" @click="cancelRemove()" class="btn btn-default">Cancel <icon name="times" /></button>
        </sweet-modal>

    </div>
</template>


<script>
  import * as storeMut from '@/store/mutation-types'
  import { SweetModal } from 'sweet-modal-vue'
  import { mapGetters } from 'vuex'

  export default {
    components: { SweetModal },
    props: ['deck'],
    data () {
      return {
        showActions: false,
        newName: '',
        newNote: '',
        newExportCode: '',
        clipboardSuccess: false
      }
    },
    computed: {
      ...mapGetters(['generateDeckTitle', 'generateDeckTitleLimit', 'lastDeckChanged']),
      showDivClass () {
        let divClass = 'deckClass-' + this.deck.type.hsClass
        console.log(this.lastDeckChanged, this.deck.id, this.deck)
        if (this.lastDeckChanged === this.deck.id) {
          divClass += ' lastChange'
        }
        return divClass
      }
    },
    methods: {
      toggleActions () {
        this.showActions = !this.showActions
      },
      editDeck () {
        this.newName = this.deck.name
        this.newNote = this.deck.note
        this.newExportCode = this.deck.exportCode
        this.$refs.modalEdit.open()
        // this.toggleActions()
      },
      confirmEdit () {
        this.$store.commit(storeMut.SET_DECK, {
          id: this.deck.id,
          name: this.newName,
          note: this.newNote,
          exportCode: this.newExportCode
        })
        this.$refs.modalEdit.close()
      },
      cancelEdit () {
        this.$refs.modalEdit.close()
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
        this.toggleActions()
      },
      remove () {
        this.$refs.modalDelete.close()
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
