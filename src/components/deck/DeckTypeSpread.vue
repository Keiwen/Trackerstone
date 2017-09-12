<template>
    <div>
        <div class="container-fluid deckTypeList">
            <div class="col-xs-6 col-sm-4 deckTypeFiltered" v-for="type in typesFiltered" @click="pickType(type)">
                {{ generateTypeTitle(type) }}
            </div>
        </div>

        <router-link :to="{ name: 'deckTypesList' }">Manage deck types</router-link>

        <div>
            <fieldset>
                <legend>Sort by:</legend>
                <enhanced-check-radio :label="sortLabels"
                                      :value="sortValues"
                                      name="deck_type_sort"
                                      subClass="primary" :animate="true" :inline="true" v-model="sortBy" :rounded="true">
                </enhanced-check-radio>
            </fieldset>
        </div>

    </div>
</template>


<script>

  import { mapGetters } from 'vuex'
  import { EnhancedCheckRadio } from 'vue-enhanced-check'

  export default {
    components: {EnhancedCheckRadio},
    data () {
      return {
        sortBy: ''
      }
    },
    computed: {
      ...mapGetters(['types', 'classes', 'generateTypeTitle', 'getTypesWithClass', 'getTypesOnTop']),
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
    .deckTypeFiltered {
        min-height: 60px;
        border: 1px solid transparent;
        cursor: pointer;
        &:hover {
            border: 1px solid #D3921F;
        }
    }

    .deckTypeList {
        margin-bottom: 20px;
    }

</style>
