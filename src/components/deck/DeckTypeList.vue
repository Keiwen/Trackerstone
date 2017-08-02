<template>
    <div class="container-fluid">
        <h2>Manage deck types</h2>

        Sort by:
        <enhanced-check-radio :label="['Star', 'Time added', 'Winrate vs']" :value="['star', 'old', 'winrate']" name="deck_type_sort"
                              subClass="primary" :animate="true" :inline="true" v-model="sortBy" :rounded="true">

        </enhanced-check-radio>


        <div class="container-fluid">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="type in typesList">
                <deck-type-show :type="type" />
                <div>
                    <confirmation-modal @modal-confirm="remove(type.id)" modalText="Are you sure you want to remove this type?"/>
                </div>
            </div>
        </div>

        <hr/>

        <deck-type-set />

        <br/><br/>

    </div>
</template>


<script>

  import { mapGetters } from 'vuex'
  import * as storeMut from '@/store/mutation-types'
  import DeckTypeShow from './DeckTypeShow'
  import ConfirmationModal from '@/components/modals/ConfirmationModal'
  import DeckTypeSet from './DeckTypeSet'
  import { EnhancedCheckRadio } from 'vue-enhanced-check'

  export default {
    components: {DeckTypeShow, ConfirmationModal, DeckTypeSet, EnhancedCheckRadio},
    data () {
      return {
        typeEnhanced: [],
        sortBy: 'star',
        topFirst: true
      }
    },
    computed: {
      ...mapGetters(['types', 'archetypes']),
      typesList () {
        switch (this.sortBy) {
          case 'star':
            return this.typesTopFirst
          case 'winrate':
            return this.getTypesByWinrateAgainst()
          case 'winrateRecent':
            return this.getTypesByWinrateAgainst(true)
          default:
            return this.types
        }
      },
      typesTopFirst () {
        const top = this.$store.getters.getTypesOnTop()
        const noTop = this.$store.getters.getTypesOnTop(false)
        return top.concat(noTop)
      }
    },
    methods: {
      remove (id) {
        this.$store.commit(storeMut.REMOVE_DECKTYPE, id)
      },
      getTypesByWinrateAgainst (recent) {
        let typeEnhanced = []
        for (let i = 0; i < this.types.length; i++) {
          let type = this.types[i]
          type.winPercentVs = this.$store.getters.getWinPercentVsType(type.id, recent)
          typeEnhanced.push(type)
        }
        return typeEnhanced.sort(function (a, b) {
          return a.winPercentVs > b.winPercentVs
        }).reverse()
      }
    }
  }

</script>


<style>
</style>
