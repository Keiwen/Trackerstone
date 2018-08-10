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
          <div class="col-xs-6">
            <button @click="add()" class="btn btn-success">Add deck</button>
          </div>
        </div>

      </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as storeMut from '@/store/mutation-types'
  import DeckTypePick from './DeckTypePick'
  import DeckShow from './DeckShow'
  import ConfirmationModal from '@/components/modals/ConfirmationModal'

  export default {
    components: {DeckTypePick, DeckShow, ConfirmationModal},
    data () {
      return {
        newType: {},
        newName: '',
        newExportCode: ''
      }
    },
    computed: {
      ...mapGetters(['deckStats', 'recentNumberGames'])
    },
    methods: {
      ...mapActions(['addSuccess', 'addError']),
      pickType (type) {
        this.newType = type
      },
      add () {
        if (!this.newType.id) {
          this.addError('No type selected')
          return
        }
        console.log(this.newType.id)
        const deckData = {
          type: this.newType,
          name: this.newName,
          exportCode: this.newExportCode,
          note: ''
        }
        this.$store.commit(storeMut.ADD_DECK, deckData)
        this.newType = {}
        this.newName = ''
        this.newExportCode = ''
        this.addSuccess('Deck added')
      },
      remove (id) {
        this.$store.commit(storeMut.REMOVE_DECK, id)
      }
    }
  }
</script>


<style lang="scss">
    .manageForm .row {
      margin-bottom: 15px;
    }
</style>
