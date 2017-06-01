<template>
    <div class="container">
        <h2>Serie</h2>
        <p>Rank: {{ rank }} - {{ rankTitle }} // Stars: {{ stars }} (Chest: {{ highest }})</p>
        <p>Next milestone: {{ nextMilestone}} - {{ milestoneTitle }} ({{ winsToMilestone }} wins needed)</p>
        <button @click="win()">Win</button>
        <button @click="loose()">Loss</button>
        <hr/>
        <button @click="reset()">Reset</button>
    </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['rank', 'stars', 'highest', 'nextMilestone', 'winsToMilestone']),
      rankTitle () {
        return this.$store.getters.rankTitle()
      },
      milestoneTitle () {
        return this.$store.getters.rankTitle(this.nextMilestone)
      }
    },
    methods: {
      ...mapActions(['win', 'loose', 'reset'])
    }
  }

</script>
