<template>
    <div class="container">
        <h2>Manage deck types</h2>
        <ul>
            <li v-for="type in types">
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
    computed: {
      ...mapGetters(['types', 'archetypes']),
      typesTopFirst () {
        const top = this.$store.getters.getTypesFiltered('top')
        const noTop = this.$store.getters.getTypesFiltered('top', false)
        return top.concat(noTop)
      }
    },
    methods: {
      pickClass (pick) {
        this.newClass = pick
      },
      pickArchetype (pick) {
        this.newArchetype = pick
      },
      remove (id) {
        this.$store.commit(storeMut.REMOVE_DECKTYPE, id)
      }
    }
  }

</script>
