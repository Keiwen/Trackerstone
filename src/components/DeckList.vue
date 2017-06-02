<template>
    <div class="container">
        <h2>Manage decks</h2>
        <ul>
            <li v-for="(deck, id) in own">{{ deck.name }} ({{ getClassName(deck.hsClass) }} {{ deck.type }}) <button @click="remove(id)">Remove</button></li>
        </ul>
        <hr/>
        <label>Class: </label>
        <class-pick @pick-class="pickClass"></class-pick>
        <label>Type: </label>
        <select v-model="newType">
            <option v-for="type in types">{{ type }}</option>
        </select>
        <label>Name (opt): </label><input type="text" v-model="newName" @keyup.enter="add()"/>
        <button @click="add()">Add</button>

        <br/><br/>
        <router-link :to="{ name: 'deckTypesSet' }">Manage deck types</router-link>


    </div>
</template>


<script>

  import { mapGetters } from 'vuex'
  import * as storeMut from '../store/mutation-types'
  import ClassPick from '@/components/ClassPick'

  export default {
    components: {ClassPick},
    data () {
      return {
        newClass: '',
        newType: '',
        newName: ''
      }
    },
    computed: {
      ...mapGetters(['own', 'classes', 'types'])
    },
    methods: {
      add () {
        const deckData = {
          hsClass: this.newClass,
          type: this.newType,
          name: this.newName
        }
        this.$store.commit(storeMut.ADD_DECK, deckData)
        this.newType = ''
        this.newName = ''
      },
      remove (id) {
        this.$store.commit(storeMut.REMOVE_DECK, id)
      },
      pickClass (pick) {
        this.newClass = pick
      },
      getClassName (id) {
        return this.$store.getters.className(id)
      }
    }
  }

</script>
