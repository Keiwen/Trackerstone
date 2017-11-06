<template>
    <div class="container-fluid">
        <h2>Serie</h2>
        <p>Rank: {{ wildMode ? rankWild : rank }} - {{ currentRankTitle }} // Stars: {{ wildMode ? starsWild : stars }} (Chest: {{ highest }})</p>
        <p>Next milestone: {{ nextMilestone}} - {{ milestoneTitle }} ({{ winsToMilestone }} wins needed)</p>
        <div class="serieTime">
        </div>
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['rank', 'stars', 'highest', 'nextMilestone', 'winsToMilestone',
        'gamesPlayed', 'gamesWon', 'winRate', 'current', 'opponent', 'recentNumberGames',
        'rankTitle', 'getSerieTimeProgress', 'getSerieTimeLeft',
        'starsInMilestone', 'starsToMilestone',
        'rankWild', 'starsWild', 'wildMode']),
      currentRankTitle () {
        return this.rankTitle()
      },
      milestoneTitle () {
        return this.rankTitle(this.nextMilestone)
      }
    }
  }
</script>


<style>
    .radial-progress-container {
        margin-left: auto;
        margin-right: auto;
        display: inline-block;
    }
</style>
