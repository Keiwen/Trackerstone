<template>
    <div class="deckShow" :class="showDivClass">
        <div class="row">
            <div class="editIcon col-xs-2" @click="editDeck()" @mouseover="hoverEditIcon()" @mouseout="hoverEditIcon()" >
                <icon name="pencil-square-o" :class="{'noted': deck.note}" :scale="editIconScale" />
            </div>
            <div class="col-xs-8">
                <h4>
                    {{ generateDeckTitle(deck) }}
                </h4>
            </div>
            <div class="col-xs-2">
            </div>
        </div>
        <p>
            {{ deck.wonWith }} - {{ deck.lossWith }}
            <i>
                ({{ deck.winPercentWith }} % global, {{ deck.winPercentWithRecent }} % last {{ deck.playedWithRecent }} games)
            </i>
        </p>
        <p>
            Score {{ deck.winScoreWith }}
        </p>

        <sweet-modal ref="modalEdit" modal-theme="dark" title="Edit deck">
            <div class="form-group">
                <label for="newName">Name:</label>
                <input type="text" id="newName" class="form-control" v-model="newName" @keyup.enter="confirmEdit()"/>
            </div>
            <div class="form-group">
                <label for="newExportCode">Export code:</label>
                <input type="text" id="newExportCode" class="form-control" v-model="newExportCode" @keyup.enter="confirmEdit()"/>
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
    props: ['deck'],
    data () {
      return {
        editIconHover: false,
        newName: this.deck.name,
        newNote: this.deck.note,
        newExportCode: this.deck.exportCode
      }
    },
    computed: {
      ...mapGetters(['generateDeckTitle', 'lastDeckChanged']),
      showDivClass () {
        let divClass = ''
        if (this.lastDeckChanged === this.deck.id) {
          divClass += ' lastChange'
        }
        return divClass
      },
      editIconScale () {
        return (this.editIconHover) ? 2 : 1
      }
    },
    methods: {
      hoverEditIcon () {
        this.editIconHover = !this.editIconHover
      },
      editDeck () {
        this.$refs.modalEdit.open()
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
      }
    }
  }

</script>

<style>

    .deckShow {
        padding-top: 20px;
        min-height: 130px;
    }



</style>
