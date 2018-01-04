<template>
    <div>
        <div class="container-fluid deckList">
            <div class="col-xs-6 col-sm-4 deckFiltered" v-for="(deck, id) in own" @click="pickDeck(id)">
                <deck-show-simple :deck="deck"></deck-show-simple>
            </div>
        </div>

        <hr/>
        <div class="col-xs-6">
        </div>
        <div class="col-xs-6">
            <router-link :to="{ name: 'deckList' }">Manage decks</router-link>
        </div>

    </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import DeckShowSimple from './DeckShowSimple'

  export default {
    components: {DeckShowSimple},
    computed: {
      ...mapGetters(['generateDeckTitle', 'own'])
    },
    methods: {
      pickDeck (key) {
        this.$emit('pick-deck', key)
      }
    }
  }
</script>

