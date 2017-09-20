<template>
    <div class="deckShow" :class="showDivClass">
        <h4>{{ generateDeckTitle(deck) }}</h4>
        <p>
            {{ deck.wonWith }} - {{ deck.lossWith }}
            <i>
                ({{ deck.winPercentWith }} % global, {{ deck.winPercentWithRecent }} % last {{ deck.playedWithRecent }} games)
            </i>
        </p>
        <p>
            Score {{ deck.winScoreWith }}
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

    .deckShow {
        padding-top: 20px;
        min-height: 130px;
    }



</style>
