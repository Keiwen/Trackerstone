<template>
    <div class="deckTypeShow" :class="showDivClass" @click="toggleActions()">
        <div class="row">
            <div class="col-xs-3">
                <div class="profil">
                </div>
            </div>
            <div class="col-xs-9">
                <div class="row">
                    <div class="col-xs-12">
                        <h4>
                            {{ generateTypeTitleLimit(type) }}
                        </h4>
                    </div>
                </div>
                <div class="col-xs-12 deckTypeStats">
                    <div class="row">
                        <!-- <div class="col-xs-1 editIcon">
                            <icon name="pencil-square-o" v-if="type.note" class="noted" />
                        </div> -->
                        <div class="col-xs-9">
                            <p>
                                {{ type.wonVs }} - {{ type.lossVs }} against<br/>
                            </p>
                        </div>
                        <div class="col-xs-3 starIcon">
                            <icon name="star" v-if="type.top" class="stared" />
                        </div>
                    </div>
                </div>

            </div>

            <div class="col-xs-12 deckTypeActions" v-if="showActions">
                <div class="col-xs-4">
                    <button slot="button" class="btn btn-warning" @click="switchTop()">TOP</button>
                </div>
                <div class="col-xs-4">
                    <button slot="button" class="btn btn-info" @click="openDetail()">EDT</button>
                </div>
                <div class="col-xs-4">
                    <button slot="button" class="btn btn-danger" @click="promptConfirmDelete()">DEL</button>
                </div>
            </div>

        </div>

        <sweet-modal ref="modalDetail" modal-theme="dark" :title="generateTypeTitle(type)">
            <div class="row">
                <div class="col-xs-6">
                    <p>
                        Record against: {{ type.wonVs }} - {{ type.lossVs }}<br/>
                        <span class="score">
                            Score: {{ type.winScoreVs }}
                        </span>
                    </p>
                </div>
                <div class="col-xs-6">
                    <p>
                        {{ type.winPercentVs }} % global<br/>
                        {{ type.winPercentVsRecent }} % last {{ type.playedVsRecent }} games
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
                <label class="control-label col-xs-4" for="newNote">Note:</label>
                <div class="col-xs-8">
                    <textarea id="newNote" rows="3" col="50" class="form-control" v-model="newNote"/>
                </div>
            </div>
            <button slot="button" @click="confirmEdit()" class="btn btn-success">Save changes <icon name="save" /></button>
            <button slot="button" @click="cancelEdit()" class="btn btn-default">Close <icon name="times" /></button>
        </sweet-modal>

        <sweet-modal icon="warning" ref="modalDelete" modal-theme="dark">
            Are you sure you want to remove deck type {{ generateTypeTitle(type) }}?
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
    props: ['type'],
    data () {
      return {
        showActions: false,
        newName: '',
        newNote: ''
      }
    },
    computed: {
      ...mapGetters(['generateTypeTitle', 'generateTypeTitleLimit', 'lastTypeChanged']),
      showDivClass () {
        let divClass = 'deckClass-' + this.type.hsClass + ' deckArchetype-' + this.type.archetype
        if (this.lastTypeChanged === this.type.id) {
          divClass += ' lastChange'
        }
        return divClass
      }
    },
    methods: {
      toggleActions () {
        this.showActions = !this.showActions
      },
      switchTop () {
        this.$store.commit(storeMut.SWITCH_DECKTYPE_TOP, this.type.id)
        // this.toggleActions()
      },
      openDetail () {
        this.newName = this.type.name
        this.newNote = this.type.note
        this.$refs.modalDetail.open()
        // this.toggleActions()
      },
      confirmEdit () {
        this.$store.commit(storeMut.SET_DECKTYPE_NAME, {id: this.type.id, name: this.newName})
        this.$store.commit(storeMut.SET_DECKTYPE_NOTE, {id: this.type.id, note: this.newNote})
        this.$refs.modalDetail.close()
      },
      cancelEdit () {
        this.$refs.modalDetail.close()
      },
      promptConfirmDelete () {
        this.$refs.modalDelete.open()
        this.toggleActions()
      },
      remove () {
        this.$refs.modalDelete.close()
        this.$store.commit(storeMut.REMOVE_DECKTYPE, this.type.id)
      },
      cancelRemove () {
        this.$refs.modalDelete.close()
      }
    }
  }
</script>


<style lang="scss">
    .deckTypeContainer {
        .deckTypeShow {
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
