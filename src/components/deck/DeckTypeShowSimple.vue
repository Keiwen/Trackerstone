<template>
    <div class="deckTypeShowSimple" :class="showDivClass">
        {{ generateTypeTitleLimit(type) }}
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['type'],
    computed: {
      ...mapGetters(['generateTypeTitleLimit']),
      showDivClass () {
        return 'deckClass-' + this.type.hsClass + ' deckArchetype-' + this.type.archetype
      }
    }
  }
</script>
