<template>
    <div class="container">
        <h2>Manage deck types</h2>

        <toggle-button @change="onTopFirstToggle" :sync="true" :value="topFirst" :labels="{checked: 'Star first', unchecked: 'Old first'}" :width="110" :height="30" />

        <ul>
            <li v-for="type in typesList">
                <deck-type-show :type="type" />
                <confirmation-modal @modal-confirm="remove(type.id)" modalText="Are you sure you want to remove this type?"/>
            </li>
        </ul>

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

  export default {
    components: {DeckTypeShow, ConfirmationModal, DeckTypeSet},
    data () {
      return {
        topFirst: true
      }
    },
    computed: {
      ...mapGetters(['types', 'archetypes']),
      typesList () {
        if (this.topFirst) return this.typesTopFirst
        return this.types
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
      onTopFirstToggle (event) {
        this.topFirst = event.value
      }
    }
  }

</script>


<style>
    .v-switch-label {
        font-size: 16px;
    }
</style>
