<template>

      <div class="container-fluid manageForm choseForm">
        <div class="row">
          <div class="col-xs-6">
            <input type="text" class="form-control" v-model="newName" @keyup.enter="add()" placeholder="Deck name (opt.)"/>
          </div>
          <div class="col-xs-6">
            <input type="text" class="form-control" v-model="newExportCode" @keyup.enter="add()" placeholder="Export code (opt.)"/>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-6">
            <deck-type-pick @pick-type="pickType" :allowGenericPick="true" />
          </div>
          <div class="col-xs-3">
            <enhanced-check v-model="wildFormat" label="Wild" :animate="true" subClass="wild" />
          </div>
          <div class="col-xs-3">
            <button @click="add()" class="btn btn-success">Add deck</button>
          </div>
        </div>

      </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import DeckTypePick from './DeckTypePick'
  import ConfirmationModal from '@/components/modals/ConfirmationModal'
  import { EnhancedCheck } from 'vue-enhanced-check'

  export default {
    components: {DeckTypePick, ConfirmationModal, EnhancedCheck},
    data () {
      return {
        newType: {},
        newName: '',
        newExportCode: '',
        wildFormat: false
      }
    },
    computed: {
      ...mapGetters(['deckStats', 'recentNumberGames'])
    },
    methods: {
      ...mapActions(['addDeck']),
      pickType (type) {
        this.newType = type
      },
      add () {
        const deckData = {
          type: this.newType,
          name: this.newName,
          exportCode: this.newExportCode,
          note: '',
          serie: this.wildFormat ? 'wild' : 'standard'
        }
        this.addDeck(deckData)
        this.$ga.event('deck', 'add', 'addDeck')
        this.newType = {}
        this.newName = ''
        this.newExportCode = ''
        this.wildFormat = false
      }
    }
  }
</script>


<style lang="scss">
    .manageForm .row {
      margin-bottom: 15px;
    }
</style>
