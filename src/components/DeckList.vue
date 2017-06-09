<template>
    <div class="container">
        <h2>Manage decks</h2>
        <ul>
            <li v-for="(deck, id) in own">
                {{ deck.name }} ({{ getClassName(deck.type.hsClass) }} {{ deck.type.name }})
                <button @click="remove(id)" class="btn btn-danger">Remove <icon name="trash" /></button>
            </li>
        </ul>
        <hr/>
        <label>Type: </label>
        <select v-model="newType">
            <optgroup label="Stared">
                <option v-for="type in typesTop" :value="type">{{ getClassName(type.hsClass) }} {{ type.name }} ({{ type.archetype }})</option>
            </optgroup>
            <optgroup label="------">
                <option v-for="type in typesNoTop" :value="type">{{ getClassName(type.hsClass) }} {{ type.name }} ({{ type.archetype }})</option>
            </optgroup>
        </select>
        <label>Name (opt): </label><input type="text" v-model="newName" @keyup.enter="add()"/>
        <button @click="add()" class="btn btn-success">Add</button>

        <br/><br/>
        <router-link :to="{ name: 'deckTypesSet' }">Manage deck types</router-link>


    </div>
</template>


<script>

  import { mapGetters } from 'vuex'
  import * as storeMut from '../store/mutation-types'

  export default {
    data () {
      return {
        newType: {},
        newName: ''
      }
    },
    computed: {
      ...mapGetters(['own', 'types']),
      typesTop () {
        return this.$store.getters.getTypesFiltered('top')
      },
      typesNoTop () {
        return this.$store.getters.getTypesFiltered('top', false)
      }
    },
    methods: {
      add () {
        const deckData = {
          type: this.newType,
          name: this.newName
        }
        this.$store.commit(storeMut.ADD_DECK, deckData)
        this.newType = {}
        this.newName = ''
      },
      remove (id) {
        this.$store.commit(storeMut.REMOVE_DECK, id)
      },
      getClassName (id) {
        return this.$store.getters.className(id)
      }
    }
  }

</script>
