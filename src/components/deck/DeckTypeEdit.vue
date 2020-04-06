<template>
    <div class="deckTypeEdit deckEdition container-fluid">
        <h3>{{ generateTypeTitle(type) }}</h3>

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
        <div class="form-group form-group-double">
            <label class="control-label col-xs-4" for="newName">Name:</label>
            <div class="col-xs-5 first-form-field">
                <input type="text" id="newName" class="form-control" v-model="newName" @keyup.enter="confirmEdit()"/>
            </div>
            <div class="col-xs-3">
                <enhanced-check v-model="newTop" label="Star" :animate="true" class="starCheck" subClass="star" />
            </div>
        </div>
        <div class="form-group" v-if="useRepresentativeCard">
            <label for="newRCard" class="control-label col-xs-4">Representative card:</label>
            <div class="input-group col-xs-8">
                <rep-card-pick :initialPick="newRCard" @pick-rep-card="repCardPicked" id="newRCard" />
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-xs-4" for="newNote">Note:</label>
            <div class="col-xs-8">
                <textarea id="newNote" :rows="useRepresentativeCard ? 3 : 4" col="50" class="form-control" v-model="newNote"/>
            </div>
        </div>

        <button slot="button" @click="promptConfirmDelete()" class="btn btn-danger away-button">Delete <icon name="trash" /></button>

        <button slot="button" @click="cancelEdit()" class="btn btn-default">Cancel <icon name="times" /></button>
        <button slot="button" @click="confirmEdit()" class="btn btn-success">Save <icon name="save" /></button>

        <sweet-modal icon="warning" ref="modalDelete" modal-theme="dark">
            Are you sure you want to remove deck type {{ generateTypeTitle(type) }}?
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
        type: {},
        newName: '',
        newNote: '',
        newRCard: '',
        newTop: false
      }
    },
    computed: {
      ...mapGetters(['generateTypeTitle', 'useRepresentativeCard'])
    },
    mounted () {
      let deckType = this.$route.params.deckType

      this.type = JSON.parse(JSON.stringify(deckType))
      this.newName = this.type.name
      this.newNote = this.type.note
      this.newTop = this.type.top
      this.newRCard = this.type.representCard
    },
    methods: {
      ...mapActions([
        'setDeckTypeName', 'setDeckTypeNote',
        'setDeckTypeRepresentCard', 'switchDeckTypeTop',
        'removeDeckType'
      ]),
      confirmEdit () {
        this.setDeckTypeName({id: this.type.id, name: this.newName})
        this.setDeckTypeNote({id: this.type.id, note: this.newNote})
        this.setDeckTypeRepresentCard({id: this.type.id, representCard: this.newRCard})
        if (this.type.top !== this.newTop) {
          this.switchDeckTypeTop(this.type.id)
        }
        this.$router.push({name: 'deckTypesList'})
      },
      cancelEdit () {
        this.$router.push({name: 'deckTypesList'})
      },
      promptConfirmDelete () {
        this.$refs.modalDelete.open()
      },
      remove () {
        this.$refs.modalDelete.close()
        this.removeDeckType(this.type.id)
        this.$ga.event('deckType', 'remove', this.type.hsClass + ' - ' + this.type.name)
        this.$router.push({name: 'deckTypesList'})
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
        color: black;
        .sweet-action-close {
            color: black;
        }
    }

    .score {
        font-weight: bold;
    }

    .deckEdition {
        margin-top: -55px;
    }

</style>
