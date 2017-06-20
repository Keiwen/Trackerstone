<template>
    <div class="container">
        <h2>Manage deck types</h2>
        <ul>
            <li v-for="type in types">
                <deck-type-show :type="type" />
                <button @click="remove(type.id)"  class="btn btn-danger">
                    Remove <icon name="trash" />
                </button>
            </li>
        </ul>

        <hr/>
        <label>Class: </label>
        <class-pick @pick-class="pickClass" />
        <label>Archetype: </label>
        <select v-model="newArchetype">
            <option v-for="archetype in archetypes">{{ archetype }}</option>
        </select>
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
  import * as storeMut from '../store/mutation-types'
  import ClassPick from '@/components/ClassPick'
  import DeckTypeShow from '@/components/DeckTypeShow'

  export default {
    components: {ClassPick, DeckTypeShow},
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
      remove (id) {
        this.$store.commit(storeMut.REMOVE_DECKTYPE, id)
      }
    }
  }

</script>
