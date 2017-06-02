<template>
    <select v-model="pick" @change="pickDeck()">
        <option v-for="(deck, id) in own" :value="id">{{ deck.name }} ({{ getClassName(deck.hsClass) }} {{ deck.type }})</option>
    </select>
</template>


<script>

  import { mapGetters } from 'vuex'
  import * as storeMut from '../store/mutation-types'

  export default {
    data () {
      return {
        pick: ''
      }
    },
    computed: {
      ...mapGetters(['own', 'current'])
    },
    methods: {
      getClassName (id) {
        return this.$store.getters.className(id)
      },
      pickDeck () {
        this.$store.commit(storeMut.CHOOSE_DECK, this.pick)
      }
    }
  }

</script>
