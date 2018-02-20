<template>
    <div>
        <div class="container-fluid deckTypeList">
            <div class="col-xs-6 col-sm-4 deckTypeFiltered" v-for="type in typesFiltered" @click="pickType(type)">
                <deck-type-show-simple :type="type"></deck-type-show-simple>
            </div>
        </div>

        <hr/>
        <div class="col-xs-6">
            <class-pick @pick-class="pickClass" :allowNone="true" />
        </div>
        <div class="col-xs-6">
            <a @click="goToManageDeckType">Manage deck types</a>
        </div>

    </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import DeckTypeShowSimple from './DeckTypeShowSimple'
  import ClassPick from '@/components/hsClass/ClassPick'

  export default {
    components: {DeckTypeShowSimple, ClassPick},
    data () {
      return {
        sortBy: ''
      }
    },
    computed: {
      ...mapGetters(['generateTypeTitle', 'getTypesWithClass', 'getTypesOnTop']),
      typesFiltered () {
        if (this.sortBy === '') {
          const typesTop = this.getTypesOnTop()
          const typesNoTop = this.getTypesOnTop(false)
          return typesTop.concat(typesNoTop)
        }
        return this.getTypesWithClass(this.sortBy)
      }
    },
    methods: {
      pickClass (key) {
        this.sortBy = key
      },
      pickType (key) {
        this.$emit('pick-type', key)
      },
      goToManageDeckType () {
        // do not use direct router link. We are in a modal,
        // it will consider that we are still in a modal
        // => scroll locked
        this.$emit('goTo', 'deckTypesList')
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
