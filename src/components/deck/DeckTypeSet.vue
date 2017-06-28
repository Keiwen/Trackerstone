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
        <label>Class: </label>
        <class-pick @pick-class="pickClass" />
        <label>Archetype: </label>
        <archetype-pick @pick-archetype="pickArchetype" />
        <label>Name: </label>
        <input type="text" v-model="newName" @keyup.enter="add()"/>
        <label for="type_top">Star: </label>
        <input type="checkbox" v-model="newTop" id="type_top"/>
        <button @click="add()" class="btn btn-success">Add</button>

        <br/><br/>

    </div>
</template>


<script>

  import { mapGetters } from 'vuex'
  import * as storeMut from '@/store/mutation-types'
  import ClassPick from '@/components/hsClass/ClassPick'
  import DeckTypeShow from './DeckTypeShow'
  import ConfirmationModal from '@/components/modals/ConfirmationModal'
  import ArchetypePick from './ArchetypePick.vue'

  export default {
    components: {ClassPick, DeckTypeShow, ConfirmationModal, ArchetypePick},
    data () {
      return {
        newName: '',
        newClass: '',
        newTop: false,
        newArchetype: ''
      }
    },
    computed: {
      ...mapGetters(['types', 'archetypes']),
      typesTopFirst () {
        const top = this.$store.getters.getTypesFiltered('top')
        const noTop = this.$store.getters.getTypesFiltered('top', false)
        return top.concat(noTop)
      }
    },
    methods: {
      add () {
        this.$store.commit(storeMut.ADD_DECKTYPE, {
          name: this.newName,
          hsClass: this.newClass,
          archetype: this.newArchetype,
          top: this.newTop
        })
      },
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
