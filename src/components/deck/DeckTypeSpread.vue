<template>
    <div>
        <div class="container-fluid deckTypeList">
            <div class="col-xs-6 col-sm-4 deckTypeFiltered" v-for="type in typesFiltered" @click="pickType(type)">
                <deck-type-show-simple :type="type"></deck-type-show-simple>
            </div>
        </div>

        <router-link :to="{ name: 'deckTypesList' }">Manage deck types</router-link>

        <div>
            <fieldset>
                <legend>Sort by:</legend>
                <enhanced-check-radio :label="sortLabels"
                                      :value="sortValues"
                                      name="deck_type_sort"
                                      subClass="primary" :animate="true" :inline="true"
                                      v-model="sortBy" :rounded="true">
                </enhanced-check-radio>
            </fieldset>
        </div>

    </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import DeckTypeShowSimple from './DeckTypeShowSimple'
  import { EnhancedCheckRadio } from 'vue-enhanced-check'

  export default {
    components: {EnhancedCheckRadio, DeckTypeShowSimple},
    data () {
      return {
        sortBy: ''
      }
    },
    computed: {
      ...mapGetters(['classes', 'generateTypeTitle', 'getTypesWithClass', 'getTypesOnTop']),
      sortLabels () {
        let labels = ['All']
        for (let hsClass in this.classes) {
          if (this.classes.hasOwnProperty(hsClass) && hsClass !== '') {
            labels.push(this.classes[hsClass].name)
          }
        }
        return labels
      },
      sortValues () {
        let values = ['']
        for (let hsClass in this.classes) {
          if (this.classes.hasOwnProperty(hsClass) && hsClass !== '') {
            values.push(this.classes[hsClass].id)
          }
        }
        return values
      },
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
      pickType (key) {
        this.$emit('pick-type', key)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
