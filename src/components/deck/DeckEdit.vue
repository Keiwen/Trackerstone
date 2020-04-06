<template>
    <div class="deckEdit deckEdition container-fluid">
        <h3>{{ generateDeckTitle(deck) }}</h3>

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
        <div class="form-group" v-if="useRepresentativeCard">
            <label for="newRCard" class="control-label col-xs-4">Representative card:</label>
            <div class="input-group col-xs-8">
                <rep-card-pick :initialPick="newRCard" @pick-rep-card="repCardPicked" id="newRCard" />
            </div>
        </div>
        <div class="form-group">
            <label for="newNote" class="control-label col-xs-4">Note:</label>
            <div class="col-xs-8">
                <textarea id="newNote" :rows="useRepresentativeCard ? 2 : 3" col="50" class="form-control" v-model="newNote"/>
            </div>
        </div>

        <button slot="button" @click="promptConfirmDelete()" class="btn btn-danger away-button">Delete <icon name="trash" /></button>

        <button slot="button" @click="cancelEdit()" class="btn btn-default">Cancel <icon name="times" /></button>
        <button slot="button" @click="confirmEdit()" class="btn btn-success">Save <icon name="save" /></button>

        <sweet-modal icon="warning" ref="modalDelete" modal-theme="dark">
            Are you sure you want to remove deck {{ generateDeckTitle(deck) }}?
            <button slot="button" @click="cancelRemove()" class="btn btn-default">Cancel <icon name="times" /></button>
            <button slot="button" @click="remove()" class="btn btn-success">Confirm <icon name="trash" /></button>
        </sweet-modal>

    </div>
</template>


<script>
  import { SweetModal } from 'sweet-modal-vue'
  import { mapGetters, mapActions } from 'vuex'
  import { EnhancedCheck } from 'vue-enhanced-check'
  import RepCardPick from './RepCardPick'

  export default {
    components: { SweetModal, EnhancedCheck, RepCardPick },
    data () {
      return {
        deck: {},
        newName: '',
        newNote: '',
        newExportCode: '',
        newRCard: '',
        clipboardSuccess: false,
        wildFormat: true
      }
    },
    computed: {
      ...mapGetters(['generateDeckTitle', 'useRepresentativeCard'])
    },
    mounted () {
      let deck = this.$route.params.deck

      this.deck = JSON.parse(JSON.stringify(deck))
      this.newName = this.deck.name
      this.newNote = this.deck.note
      this.newRCard = this.deck.representCard
      this.newExportCode = this.deck.exportCode
      this.wildFormat = (this.deck.serie === 'wild')
    },
    methods: {
      ...mapActions(['setDeck', 'removeDeck']),
      confirmEdit () {
        const deckData = {
          id: this.deck.id,
          name: this.newName,
          note: this.newNote,
          representCard: this.newRCard,
          exportCode: this.newExportCode,
          serie: this.wildFormat ? 'wild' : 'standard'
        }
        this.setDeck(deckData)
        this.$router.push({name: 'deckList'})
      },
      cancelEdit () {
        this.$router.push({name: 'deckList'})
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
        this.removeDeck(this.deck.id)
        this.$ga.event('deck', 'remove', 'removeDeck')
        this.$router.push({name: 'deckList'})
      },
      cancelRemove () {
        this.$refs.modalDelete.close()
      },
      repCardPicked (rCard) {
        this.newRCard = rCard
      }
    }
  }
</script>

<style lang="scss" scoped>
    #newRCard {
        .sweet-action-close {
            color: white;
        }
    }

    .score {
        font-weight: bold;
    }

    .deckEdition {
        margin-top: -55px;
    }

</style>
