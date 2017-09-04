<template>
    <div class="deckShow" :class="showDivClass">
        <h4>{{ generateDeckTitle(deck) }}</h4>
        <p>
            Won {{ deck.wonWith }} / {{ deck.playedWith }}
            <i>
                ({{ deck.winPercentWith }} % global, {{ deck.winPercentWithRecent }} % last {{ deck.playedWithRecent }} games)
                - score {{ deck.winScoreWith }}
            </i>
        </p>
    </div>
</template>


<script>

  import { mapGetters } from 'vuex'

  export default {
    props: ['deck'],
    computed: {
      ...mapGetters(['generateDeckTitle', 'lastDeckChanged']),
      showDivClass () {
        let divClass = ''
        if (this.lastDeckChanged === this.deck.id) {
          divClass += ' lastChange'
        }
        return divClass
      }
    }
  }

</script>

<style>


</style>
