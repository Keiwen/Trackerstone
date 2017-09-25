<template>
    <div class="container-fluid">
        <h2>Manage decks</h2>
        <div class="container-fluid">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(deck, id) in deckStats">
                <deck-show :deck="deck" />
                <div>
                    <confirmation-modal @modal-confirm="remove(id)" modalText="Are you sure you want to delete this deck?"/>
                </div>
            </div>
        </div>
        <router-link :to="{ name: 'deckChart' }">See charts</router-link>
        <hr/>
        <div class="settingForm manageForm">
          <div class="row">
            <div class="col-xs-12 col-sm-12 align-col">
              <label>Type: </label>
              <deck-type-pick @pick-type="pickType" />
            </div>
            <div class="col-xs-12 col-sm-12 align-col">
              <label>Name (opt): </label>
              <input type="text" v-model="newName" @keyup.enter="add()"/>
            </div>
            <div class="col-xs-12 col-sm-12 align-col">
              <label>Export code (opt): </label>
              <input type="text" v-model="newExportCode" @keyup.enter="add()"/>
            </div>
            <div class="col-xs-12 col-sm-12 align-col">
              <button @click="add()" class="btn btn-success">Add</button>
            </div>
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
      ...mapActions(['addSuccess']),
      pickType (type) {
        this.newType = type
      },
      add () {
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


<style>

</style>
