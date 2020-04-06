<template>
    <div>
        <div class="container-fluid deckTypeList">
            <div class="col-xs-4 col-sm-3 deckTypeFiltered genericDeckType" v-if="allowGenericPick && sortBy" @click="pickType(genericTypeFromSortedClass)">
                <deck-type-show-simple :type="genericTypeFromSortedClass"></deck-type-show-simple>
            </div>

            <div class="col-xs-4 col-sm-3 deckTypeFiltered" v-for="type in typesFiltered" @click="pickType(type)">
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
    props: {
      allowGenericPick: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        sortBy: ''
      }
    },
    computed: {
      ...mapGetters(['generateTypeTitle', 'getTypesWithClass', 'getTypesOnTop', 'getGenericType']),
      typesFiltered () {
        if (this.sortBy === '') {
          const typesTop = this.getTypesOnTop()
          const typesNoTop = this.getTypesOnTop(false)
          return typesTop.concat(typesNoTop)
        }
        return this.getTypesWithClass(this.sortBy)
      },
      genericTypeFromSortedClass () {
        if (!this.sortBy) return {}
        return this.getGenericType(this.sortBy)
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

<style lang="scss" scoped>

    .deckTypeList {
        margin-bottom: 20px;
        height: 180px;
        overflow-y: scroll;
    }

    .deckTypeFiltered {
        height: 50px;
        border: 1px solid transparent;
        cursor: pointer;
        &:hover {
            border: 1px solid var(--orange-ts);
        }
        display: inline-block;
        line-height: 1.5;
        vertical-align: middle;
    }

    .genericDeckType {
        font-style: italic;
        color: #888888;
    }


</style>
