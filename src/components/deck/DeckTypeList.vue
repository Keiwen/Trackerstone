<template>
    <div class="container-fluid">
        <h2>Manage deck types</h2>

        Sort by:
        <enhanced-check-radio :label="['Star', 'Class', 'Played vs', 'Winrate vs', 'Win score vs']"
                              :value="['star', 'hsClass', 'played', 'winrate', 'winscore']"
        					  name="deck_type_sort"
        					  subClass="primary" :animate="true" :inline="true" v-model="sortBy" :rounded="true">
        </enhanced-check-radio>

        <div class="container-fluid">
            <div class="deckTypeContainer col-xs-6 col-sm-6 col-md-4 col-lg-3" v-for="type in typesList">
                <deck-type-show :type="type" />
                <div>
                    <confirmation-modal @modal-confirm="remove(type.id)" modalText="Are you sure you want to remove this type?"/>
                </div>
            </div>
        </div>

        <see-chart-button routeName="deckTypeChart" />
        <hr/>

        <deck-type-set />

    </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import * as storeMut from '@/store/mutation-types'
  import DeckTypeShow from './DeckTypeShow'
  import ConfirmationModal from '@/components/modals/ConfirmationModal'
  import DeckTypeSet from './DeckTypeSet'
  import { EnhancedCheckRadio } from 'vue-enhanced-check'
  import SeeChartButton from '@/components/charts/SeeChartButton'

  export default {
    components: {DeckTypeShow, ConfirmationModal, DeckTypeSet, EnhancedCheckRadio, SeeChartButton},
    data () {
      return {
        typeEnhanced: [],
        sortBy: 'star',
        topFirst: true
      }
    },
    computed: {
      ...mapGetters(['sortList', 'typesStats']),
      typesList () {
        switch (this.sortBy) {
          case 'star':
            return this.sortList(this.typesStats, 'top')
          case 'played':
            return this.sortList(this.typesStats, 'playedVs')
          case 'winscore':
            return this.sortList(this.typesStats, 'winScoreVs')
          case 'winrate':
            return this.sortList(this.typesStats, 'winPercentVs')
          case 'winrateRecent':
            return this.sortList(this.typesStats, 'winPercentVsRecent')
          case 'hsClass':
            return this.sortList(this.typesStats, 'hsClass', true)
          default:
            return this.typesStats
        }
      }
    },
    methods: {
      remove (id) {
        this.$store.commit(storeMut.REMOVE_DECKTYPE, id)
      }
    }
  }
</script>


<style>
</style>
