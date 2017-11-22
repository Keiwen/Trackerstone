<template>
    <div class="deckShow">
        {{ generateDeckTitle(deck) }}
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['deck'],
    computed: {
      ...mapGetters(['generateDeckTitle'])
    }
  }
</script>
