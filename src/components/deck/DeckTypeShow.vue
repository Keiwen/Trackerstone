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
            Won {{ type.wonVs }} / {{ type.playedVs }} against
            <i>
                ({{ type.winPercentVs }} % global, {{ type.winPercentVsRecent }} % last {{ type.playedVsRecent }} games)
                 - score {{ type.winScoreVs }}
            </i>
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
        newName: this.type.name,
        newNote: this.type.note
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
