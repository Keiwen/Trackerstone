<template>
    <div class="container-fluid">
        <h2>Serie</h2>
        <p>Rank: {{ rank }} - {{ currentRankTitle }} // Stars: {{ stars }} (Chest: {{ highest }})</p>
        <p>Next milestone: {{ nextMilestone}} - {{ milestoneTitle }} ({{ winsToMilestone }} wins needed)</p>
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['rank', 'stars', 'highest', 'nextMilestone', 'winsToMilestone',
        'gamesPlayed', 'gamesWon', 'winRate', 'current', 'opponent', 'recentNumberGames',
        'rankTitle']),
      currentRankTitle () {
        return this.rankTitle()
      },
      milestoneTitle () {
        return this.rankTitle(this.nextMilestone)
      }
    }
  }

</script>
