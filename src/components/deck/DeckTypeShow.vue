<template>
    <div class="deckTypeShow">
        <div class="row">
            <div class="editIcon col-xs-2" @click="editType()" @mouseover="hoverEditIcon()" @mouseout="hoverEditIcon()" >
                <icon name="pencil-square-o" :class="{'noted': type.note}" :scale="editIconScale" />
            </div>
            <div class="col-xs-8">
                <h4>
                    {{ getClassName(type.hsClass) }} {{ type.name }} ({{ type.archetype }})
                </h4>
            </div>
            <div class="starIcon col-xs-2" @click="switchTop()" @mouseover="hoverStarIcon()" @mouseout="hoverStarIcon()" >
                <icon name="star" v-if="type.top" class="stared" :scale="starIconScale" />
                <icon name="star-o" v-else :scale="starIconScale" />
            </div>
        </div>
        <p>
            Won {{ getGamesWonVsCount() }} / {{ getGamesPlayedVsCount() }} against
            <i>
                ({{ getWinPercentVs() }} % global, {{ getWinPercentVs(true) }} % last {{ getGamesPlayedVsCount(true) }} games)
                 - score {{ getWinScoreVs() }}
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
      starIconScale () {
        return (this.starIconHover) ? 2 : 1
      },
      editIconScale () {
        return (this.editIconHover) ? 2 : 1
      }
    },
    methods: {
      getClassName (id) {
        return this.$store.getters.className(id)
      },
      getGamesPlayedVsCount (recent) {
        return this.$store.getters.getGamesVsType(this.type.id, recent).length
      },
      getGamesWonVsCount (recent) {
        return this.$store.getters.getGamesWonVsType(this.type.id, recent).length
      },
      getWinPercentVs (recent) {
        return this.$store.getters.getWinPercentVsType(this.type.id, recent)
      },
      getWinScoreVs (recent) {
        return this.$store.getters.getWinScoreVsType(this.type.id, recent)
      },
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

<style lang="scss">
    .deckTypeShow {
        padding-top: 20px;
        min-height: 120px;
    }

    .starIcon,.editIcon {
        cursor: pointer;
        padding-bottom: 1em;
        &:hover {
            padding-bottom: 0;
        }
    }

    .stared {
        color: #C6AA37;
    }

    .noted {
        color: #C6AA37;
    }

</style>
