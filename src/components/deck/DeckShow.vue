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
        newName: '',
        newNote: '',
        newExportCode: '',
        clipboardSuccess: false
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
        this.newName = this.deck.name
        this.newNote = this.deck.note
        this.newExportCode = this.deck.exportCode
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
      },
      onClipboardSuccess () {
        this.clipboardSuccess = true
        setTimeout(this.onClipboardOut, 1000)
      },
      onClipboardOut () {
        this.clipboardSuccess = false
      }
    }
  }
</script>

<style lang="scss">

    .deckShow {
        padding-top: 20px;
        min-height: 130px;
    }

    .editIcon {
        cursor: pointer;
        padding-bottom: 1em;
        &:hover {
             padding-bottom: 0;
        }
    }

    .noted {
        color: #C6AA37;
    }

</style>
