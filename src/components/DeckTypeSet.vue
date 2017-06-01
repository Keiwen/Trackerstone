<template>
    <div class="container">
        <h2>Manage deck types</h2>
        <ul>
            <li v-for="type in types">{{ type }} <button @click="remove(type)">Remove</button></li>
            <li><input type="text" v-model="newType" @keyup.enter="add()"/> <button @click="add()">Add</button></li>
        </ul>

    </div>
</template>


<script>

  import { mapGetters } from 'vuex'
  import * as storeMut from '../store/mutation-types'

  export default {
    data () {
      return {
        newType: ''
      }
    },
    computed: {
      ...mapGetters(['types'])
    },
    methods: {
      add () {
        this.$store.commit(storeMut.ADD_DECKTYPE, this.newType)
        this.newType = ''
      },
      remove (type) {
        this.$store.commit(storeMut.REMOVE_DECKTYPE, type)
      }
    }
  }

</script>
