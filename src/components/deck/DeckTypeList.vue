<template>
    <div class="container-fluid">
        <h2>Manage deck types</h2>

        Sort by:
		<input type="radio" id="star" value="star" v-model="sortBy">
		<label for="star">Star</label>
		<input type="radio" id="hsClass" value="hsClass" v-model="sortBy">
		<label for="hsClass">Class</label>
		<input type="radio" id="played" value="played" v-model="sortBy">
		<label for="played">Played vs</label>
		<input type="radio" id="winrate" value="winrate" v-model="sortBy">
		<label for="winrate">Winrate vs</label>
		<input type="radio" id="winscore" value="winscore" v-model="sortBy">
		<label for="winscore">Win score vs</label>

        <div class="container-fluid">
            <div class="deckTypeContainer col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="type in typesList">
                <deck-type-show :type="type" />
                <div>
                    <confirmation-modal @modal-confirm="remove(type.id)" modalText="Are you sure you want to remove this type?"/>
                </div>
            </div>
        </div>

        <br/><br/>
        <router-link :to="{ name: 'deckTypeChart' }">See charts</router-link>
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

  export default {
    components: {DeckTypeShow, ConfirmationModal, DeckTypeSet},
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
            return this.sortList(this.typesStats, 'top').reverse()
          case 'played':
            return this.sortList(this.typesStats, 'playedVs').reverse()
          case 'winscore':
            return this.sortList(this.typesStats, 'winScoreVs').reverse()
          case 'winrate':
            return this.sortList(this.typesStats, 'winPercentVs').reverse()
          case 'winrateRecent':
            return this.sortList(this.typesStats, 'winPercentVsRecent').reverse()
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
