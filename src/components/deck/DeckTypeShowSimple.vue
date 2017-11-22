<template>
    <div class="deckTypeShowSimple" :class="showDivClass">
        {{ generateTypeTitle(type) }}
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['type'],
    computed: {
      ...mapGetters(['generateTypeTitle']),
      showDivClass () {
        return 'deckClass-' + this.type.hsClass + ' deckArchetype-' + this.type.archetype
      }
    }
  }
</script>
