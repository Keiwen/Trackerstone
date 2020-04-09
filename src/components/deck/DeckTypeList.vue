<template>
    <div class="container-fluid">
        <div class="row">
            Sort by:
            <enhanced-check-radio :label="['Star', 'Class', 'Played vs', 'Winrate vs', 'Win score vs']"
                                  :value="['star', 'hsClass', 'played', 'winrate', 'winscore']"
                                  name="deck_type_sort"
                                  subClass="default" :animate="true" :inline="true" v-model="sortBy" :rounded="true">
            </enhanced-check-radio>
        </div>

        <div class="container-fluid deckTypeContent">
            <div class="deckTypeContainer col-xs-6 col-sm-6 col-md-4 col-lg-3"
                 v-for="type in typesList"
                 @click="openEdition(type.id)">
                <deck-type-show :id-type="type.id" />
            </div>
        </div>

        <see-chart-button routeName="deckTypeChart" />
        <hr/>

        <deck-type-set />

    </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import DeckTypeShow from './DeckTypeShow'
  import DeckTypeSet from './DeckTypeSet'
  import { EnhancedCheckRadio } from 'vue-enhanced-check'
  import SeeChartButton from '@/components/charts/SeeChartButton'

  export default {
    components: {DeckTypeShow, DeckTypeSet, EnhancedCheckRadio, SeeChartButton},
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
        let typesList = []
        for (let idType in this.typesStats) {
          if (this.typesStats.hasOwnProperty(idType)) {
            typesList.push(this.typesStats[idType])
          }
        }
        switch (this.sortBy) {
          case 'star':
            return this.sortList(typesList, 'top')
          case 'played':
            return this.sortList(typesList, 'playedVs')
          case 'winscore':
            return this.sortList(typesList, 'winScoreVs')
          case 'winrate':
            return this.sortList(typesList, 'winPercentVs')
          case 'winrateRecent':
            return this.sortList(typesList, 'winPercentVsRecent')
          case 'hsClass':
            return this.sortList(typesList, 'hsClass', true)
          default:
            return typesList
        }
      }
    },
    methods: {
      openEdition (idType) {
        this.$router.push({name: 'deckTypeEdit', params: {idType: idType}})
      }
    }
  }
</script>


<style lang="scss">
    .deckTypeContent {
        padding: 0;
        .deckTypeContainer {
            margin-bottom: 10px;
            padding-left: 10px;
            padding-right: 10px;
        }
    }

</style>
