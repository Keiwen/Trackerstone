<template>
    <div class="container">
        <h2>Manage deck archetypes</h2>
        <ul>
            <li v-for="archetype in archetypes">{{ archetype }} <button @click="remove(archetype)">Remove <icon name="trash" /></button></li>
            <li><input type="text" v-model="newArchetype" @keyup.enter="add()"/> <button @click="add()">Add</button></li>
        </ul>
    </div>
</template>


<script>

  import { mapGetters } from 'vuex'
  import * as storeMut from '../store/mutation-types'

  export default {
    data () {
      return {
        newArchetype: ''
      }
    },
    computed: {
      ...mapGetters(['archetypes'])
    },
    methods: {
      add () {
        this.$store.commit(storeMut.ADD_DECKARCHETYPE, this.newArchetype)
        this.newArchetype = ''
      },
      remove (type) {
        this.$store.commit(storeMut.REMOVE_DECKARCHETYPE, type)
      }
    }
  }

</script>
