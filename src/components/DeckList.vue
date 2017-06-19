<template>
    <div class="container">
        <h2>Manage decks</h2>
        <ul>
            <li v-for="(deck, id) in own">
                <deck-show :deck="deck" :idDeck="id"></deck-show>
                <button @click="remove(id)" class="btn btn-danger">Remove <icon name="trash" /></button>
            </li>
        </ul>
        <hr/>
        <label>Type: </label>
        <type-pick @pick-type="pickType"></type-pick>
        <label>Name (opt): </label><input type="text" v-model="newName" @keyup.enter="add()"/>
        <button @click="add()" class="btn btn-success">Add</button>

        <br/><br/>
        <router-link :to="{ name: 'deckTypesSet' }">Manage deck types</router-link>


    </div>
</template>


<script>

  import { mapGetters } from 'vuex'
  import * as storeMut from '../store/mutation-types'
  import TypePick from '@/components/TypePick'
  import DeckShow from '@/components/DeckShow'

  export default {
    components: {TypePick, DeckShow},
    data () {
      return {
        recentNumberGames: 10,
        newType: {},
        newName: ''
      }
    },
    computed: {
      ...mapGetters(['own', 'types'])
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
      },
      getDeckGames (id, recent) {
        id = parseInt(id)
        let gamesCount = 0
        if (typeof recent !== 'undefined' && recent) gamesCount = this.recentNumberGames
        return this.$store.getters.getGamesFiltered(gamesCount, 'deck.id', id)
      },
      getDeckGamesPlayed (id, recent) {
        return this.getDeckGames(id, recent).length
      },
      getDeckGamesWon (id, recent) {
        const games = this.getDeckGames(id, recent)
        const wons = games.filter(game => {
          return game['won'] === true
        })
        return wons.length
      },
      getDeckWinPercent (id, recent) {
        if (this.getDeckGamesPlayed(id, recent) === 0) return 0
        return Math.round((this.getDeckGamesWon(id, recent) / this.getDeckGamesPlayed(id, recent)) * 100)
      }
    }
  }

</script>
