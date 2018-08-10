<template>
    <div class="container-fluid">
        <div class="container-fluid deckContent">
            <div class="deckContainer col-xs-6 col-sm-6 col-md-4 col-lg-3" v-for="(deck, id) in deckStats">
                <deck-show :deck="deck" />
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
  import * as storeMut from '@/store/mutation-types'
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
      }
    }
  }
</script>


<style>

</style>
