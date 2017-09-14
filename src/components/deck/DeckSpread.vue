<template>
    <div>
        <div class="container-fluid deckList">
            <div class="col-xs-6 col-sm-4 deckFiltered" v-for="(deck, id) in own" @click="pickDeck(id)">
                {{ generateDeckTitle(deck) }}
            </div>
        </div>

        <router-link :to="{ name: 'deckList' }">Manage decks</router-link>

    </div>
</template>


<script>

  import { mapGetters } from 'vuex'

  export default {
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

<style scoped lang="scss">
    .deckFiltered {
        min-height: 60px;
        border: 1px solid transparent;
        cursor: pointer;
        &:hover {
            border: 1px solid #D3921F;
        }
    }

    .deckList {
        margin-bottom: 20px;
    }

</style>
