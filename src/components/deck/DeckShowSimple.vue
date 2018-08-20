<template>
    <div class="deckShow">
        {{ generateDeckTitleLimit(deck) }}
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['deck'],
    computed: {
      ...mapGetters(['generateDeckTitleLimit'])
    }
  }
</script>
