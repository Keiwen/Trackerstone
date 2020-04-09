<template>
    <div class="container-fluid">
        <div class="container-fluid deckContent">
            <div class="deckContainer col-xs-6 col-sm-6 col-md-4 col-lg-3"
                 v-for="(deck, id) in own"
                 @click="openEdition(deck)">
                <deck-show :id-deck="id" />
            </div>
        </div>

        <br/>
        <see-chart-button routeName="deckChart" />
        <hr/>

        <deck-set></deck-set>

    </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import DeckShow from './DeckShow'
  import DeckSet from './DeckSet'
  import ConfirmationModal from '@/components/modals/ConfirmationModal'
  import SeeChartButton from '@/components/charts/SeeChartButton'

  export default {
    components: {DeckShow, DeckSet, ConfirmationModal, SeeChartButton},
    data () {
      return {
        newType: {},
        newName: '',
        newExportCode: ''
      }
    },
    computed: {
      ...mapGetters(['own'])
    },
    methods: {
      ...mapActions(['addDeck']),
      pickType (type) {
        this.newType = type
      },
      openEdition (deck) {
        this.$router.push({name: 'deckEdit', params: {deck: deck}})
      },
      add () {
        const deckData = {
          type: this.newType,
          name: this.newName,
          exportCode: this.newExportCode,
          note: ''
        }
        this.addDeck(deckData)
        this.newType = {}
        this.newName = ''
        this.newExportCode = ''
      }
    }
  }
</script>


<style lang="scss">

    .deckContent {
        padding: 0;
        .deckContainer {
            margin-bottom: 10px;
            padding-left: 10px;
            padding-right: 10px;
        }
    }

</style>
