<template>
    <div class="deckTypeShow" :class="showDivClass">
        <div class="row">
            <div class="col-xs-2">
              <div class="editIcon" @click="editType()" @mouseover="hoverEditIcon()" @mouseout="hoverEditIcon()" >
                  <icon name="pencil-square-o" :class="{'noted': type.note}" :scale="editIconScale" />
              </div>
            </div>
            <div class="col-xs-8">
              <div class="profil">
                <h4>
                    {{ generateTypeTitle(type) }}
                </h4>
              </div>
            </div>
            <div class="col-xs-2">
            <div class="starIcon" @click="switchTop()" @mouseover="hoverStarIcon()" @mouseout="hoverStarIcon()">
                <icon name="star" v-if="type.top" class="stared" :scale="starIconScale" />
                <icon name="star-o" v-else :scale="starIconScale" />
            </div>
          </div>
        </div>
        <p>
            {{ type.wonVs }} - {{ type.lossVs }} against
            <i>
                ({{ type.winPercentVs }} % global, {{ type.winPercentVsRecent }} % last {{ type.playedVsRecent }} games)
            </i>
        </p>
        <p>
            Score {{ type.winScoreVs }}
        </p>

        <sweet-modal ref="modalEdit" modal-theme="dark" title="Edit type">
            <div class="form-group">
                <label for="newName">Name:</label>
                <input type="text" id="newName" class="form-control" v-model="newName" @keyup.enter="confirmEdit()"/>
            </div>
            <div class="form-group">
                <label for="newNote">Note:</label>
                <textarea id="newNote" rows="5" col="50" class="form-control" v-model="newNote"/>
            </div>
            <button slot="button" @click="confirmEdit()" class="btn btn-success">Save <icon name="save" /></button>
            <button slot="button" @click="cancelEdit()" class="btn btn-default">Cancel <icon name="times" /></button>
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
        starIconHover: false,
        editIconHover: false,
        newName: '',
        newNote: ''
      }
    },
    computed: {
      ...mapGetters(['generateTypeTitle', 'lastTypeChanged']),
      showDivClass () {
        let divClass = 'deckClass-' + this.type.hsClass + ' deckArchetype-' + this.type.archetype
        if (this.lastTypeChanged === this.type.id) {
          divClass += ' lastChange'
        }
        return divClass
      },
      starIconScale () {
        return (this.starIconHover) ? 2 : 1
      },
      editIconScale () {
        return (this.editIconHover) ? 2 : 1
      }
    },
    methods: {
      hoverStarIcon () {
        this.starIconHover = !this.starIconHover
      },
      switchTop () {
        this.$store.commit(storeMut.SWITCH_DECKTYPE_TOP, this.type.id)
      },
      hoverEditIcon () {
        this.editIconHover = !this.editIconHover
      },
      editType () {
        this.newName = this.type.name
        this.newNote = this.type.note
        this.$refs.modalEdit.open()
      },
      confirmEdit () {
        this.$store.commit(storeMut.SET_DECKTYPE_NAME, {id: this.type.id, name: this.newName})
        this.$store.commit(storeMut.SET_DECKTYPE_NOTE, {id: this.type.id, note: this.newNote})
        this.$refs.modalEdit.close()
      },
      cancelEdit () {
        this.$refs.modalEdit.close()
      }
    }
  }

</script>


<style lang="scss">
    .deckTypeContainer {
        .deckTypeShow {
            .profil {
                background: url('../../assets/charac_skins.jpg') 0 0 no-repeat;
            }
        }
        .deckClass {
            &-druid .profil {
                background-position: -32px 0;
            }

            &-hunter .profil {
                background-position: -32px -70px;
            }

            &-mage .profil {
                background-position: -32px -140px;
            }

            &-paladin .profil {
                background-position: -32px -210px;
            }

            &-priest .profil {
                background-position: -32px -280px;
            }

            &-rogue .profil {
                background-position: -32px -350px;
            }

            &-shaman .profil {
                background-position: -32px -420px;
            }

            &-warlock .profil {
                background-position: -32px -490px;
            }

            &-warrior .profil {
                background-position: -32px -560px;
            }
        }
    }

</style>
