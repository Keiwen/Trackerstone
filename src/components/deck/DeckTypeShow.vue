<template>
    <span>
        {{ getClassName(type.hsClass) }} {{ type.name }} ({{ type.archetype }})
        <icon name="star" v-if="type.top" />
        -
        Won {{ getGamesWonVsCount() }} / {{ getGamesPlayedVsCount() }} against ({{ getWinPercentVs() }} % global, {{ getWinPercentVs(true) }} % last {{ getGamesPlayedVsCount(true) }} games)
    </span>
</template>


<script>

  export default {
    props: ['type'],
    methods: {
      getClassName (id) {
        return this.$store.getters.className(id)
      },
      getGamesPlayedVsCount (recent) {
        return this.$store.getters.getGamesVsType(this.type.id, recent).length
      },
      getGamesWonVsCount (recent) {
        return this.$store.getters.getGamesWonVsType(this.type.id, recent).length
      },
      getWinPercentVs (recent) {
        return this.$store.getters.getWinPercentVsType(this.type.id, recent)
      }
    }
  }

</script>
