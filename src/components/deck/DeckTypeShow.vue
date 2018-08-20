<template>
    <div class="deckTypeShow" :class="showDivClass">
        <div class="row" @click="openDetail()">
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

        </div>

        <sweet-modal ref="modalDetail" modal-theme="dark" :title="generateTypeTitle(type)">
            <div class="row detailStats">
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
                <div class="col-xs-12">
                    <enhanced-check v-model="newTop" label="Star" :animate="true" class="starCheck" subClass="star" />
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-xs-4" for="newName">Name:</label>
                <div class="col-xs-8">
                    <input type="text" id="newName" class="form-control" v-model="newName" @keyup.enter="confirmEdit()"/>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-xs-4" for="newNote">Note:</label>
                <div class="col-xs-8">
                    <textarea id="newNote" rows="2" col="50" class="form-control" v-model="newNote"/>
                </div>
            </div>

            <button slot="button" @click="promptConfirmDelete()" class="btn btn-danger away-button">Delete <icon name="trash" /></button>

            <button slot="button" @click="cancelEdit()" class="btn btn-default">Cancel <icon name="times" /></button>
            <button slot="button" @click="confirmEdit()" class="btn btn-success">Save <icon name="save" /></button>
        </sweet-modal>

        <sweet-modal icon="warning" ref="modalDelete" modal-theme="dark">
            Are you sure you want to remove deck type {{ generateTypeTitle(type) }}?
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
    props: ['type'],
    data () {
      return {
        newName: '',
        newNote: '',
        newTop: false
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
      openDetail () {
        this.newName = this.type.name
        this.newNote = this.type.note
        this.newTop = this.type.top
        this.$refs.modalDetail.open()
      },
      confirmEdit () {
        this.$store.commit(storeMut.SET_DECKTYPE_NAME, {id: this.type.id, name: this.newName})
        this.$store.commit(storeMut.SET_DECKTYPE_NOTE, {id: this.type.id, note: this.newNote})
        if (this.type.top !== this.newTop) {
          this.$store.commit(storeMut.SWITCH_DECKTYPE_TOP, this.type.id)
        }
        this.$refs.modalDetail.close()
      },
      cancelEdit () {
        this.$refs.modalDetail.close()
      },
      promptConfirmDelete () {
        this.$refs.modalDelete.open()
      },
      remove () {
        this.$refs.modalDelete.close()
        this.$refs.modalDetail.close()
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
                background: url('../../assets/icones_classes.png') 0 0 no-repeat;
            }
        }
        .deckClass {
            &-hunter .profil {
                background-position: -40px -40px;
            }

            &-warlock .profil {
                background-position: -160px -40px;
            }

            &-shaman .profil {
                background-position: -280px -40px;
            }

            &-mage .profil {
                background-position: -40px -160px;
            }

            &-druid .profil {
                background-position: -160px -160px;
            }

            &-paladin .profil {
                background-position: -280px -160px;
            }

            &-priest .profil {
                background-position: -40px -280px;
            }

            &-warrior .profil {
                background-position: -160px -280px;
            }

            &-rogue .profil {
                background-position: -280px -280px;
            }

        }
    }

</style>
