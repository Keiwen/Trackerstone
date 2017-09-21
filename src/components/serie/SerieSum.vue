<template>
    <div class="container-fluid">
        <h2>Serie</h2>
        <p>Rank: {{ rank }} - {{ currentRankTitle }} // Stars: {{ stars }} (Chest: {{ highest }})</p>
        <p>Next milestone: {{ nextMilestone}} - {{ milestoneTitle }} ({{ winsToMilestone }} wins needed)</p>
        <div class="serieTime">
            <radial-progress-bar :diameter="100"
                                 :completed-steps="getSerieTimeProgress"
                                 :strokeWidth="10"
                                 :total-steps="100"
                                 startColor="#463C3B"
                                 stopColor="#D3921F"
                                 innerStrokeColor="#DDDDDD">
                <p>{{ getSerieTimeLeft }}<br/>days left</p>
            </radial-progress-bar>
        </div>
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import RadialProgressBar from 'vue-radial-progress'

  export default {
    components: { RadialProgressBar },
    computed: {
      ...mapGetters(['rank', 'stars', 'highest', 'nextMilestone', 'winsToMilestone',
        'gamesPlayed', 'gamesWon', 'winRate', 'current', 'opponent', 'recentNumberGames',
        'rankTitle', 'getSerieTimeProgress', 'getSerieTimeLeft']),
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
    }
</style>
