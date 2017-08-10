<template>
    <div class="container-fluid">
        <h2>Manage decks</h2>
        <div class="container-fluid">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(deck, id) in own">
                <deck-show :deck="deck" :idDeck="id" />
                <div>
                    <confirmation-modal @modal-confirm="remove(id)" modalText="Are you sure you want to delete this deck?"/>
                </div>
            </div>
        </div>
        <router-link :to="{ name: 'deckChart' }">See charts</router-link>
        <hr/>
        <label>Type: </label>
        <type-pick @pick-type="pickType" />
        <label>Name (opt): </label><input type="text" v-model="newName" @keyup.enter="add()"/>
        <button @click="add()" class="btn btn-success">Add</button>

        <br/><br/>
        <router-link :to="{ name: 'deckTypesList' }">Manage deck types</router-link>


    </div>
</template>


<script>

  import { mapGetters } from 'vuex'
  import * as storeMut from '@/store/mutation-types'
  import TypePick from './TypePick'
  import DeckShow from './DeckShow'
  import ConfirmationModal from '@/components/modals/ConfirmationModal'

  export default {
    components: {TypePick, DeckShow, ConfirmationModal},
    data () {
      return {
        newType: {},
        newName: ''
      }
    },
    computed: {
      ...mapGetters(['own', 'types', 'recentNumberGames'])
    },
    methods: {
      pickType (type) {
        this.newType = type
      },
      add () {
        const deckData = {
          type: this.newType,
          name: this.newName
        }
        this.$store.commit(storeMut.ADD_DECK, deckData)
        this.newType = {}
        this.newName = ''
      },
      remove (id) {
        this.$store.commit(storeMut.REMOVE_DECK, id)
      },
      getClassName (id) {
        return this.$store.getters.className(id)
      }
    }
  }

</script>


<style>

</style>
