<template>
    <select v-model="pick" @change="pickDeck()">
        <option v-for="(deck, id) in own" :value="id">{{ generateDeckTitle(deck) }}</option>
    </select>
</template>


<script>

  import { mapGetters } from 'vuex'
  import * as storeMut from '@/store/mutation-types'

  export default {
    data () {
      return {
        pick: ''
      }
    },
    computed: {
      ...mapGetters(['own', 'current', 'generateDeckTitle'])
    },
    mounted: function () {
      this.pick = this.current.id
    },
    methods: {
      pickDeck () {
        this.$store.commit(storeMut.CHOOSE_DECK, this.pick)
      }
    }
  }

</script>
