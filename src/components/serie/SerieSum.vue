<template>
    <div class="container-fluid">
        <h2>Serie</h2>
        <p>Rank: {{ rank }} - {{ currentRankTitle }} // Stars: {{ stars }} (Chest: {{ highest }})</p>
        <p>Next milestone: {{ nextMilestone}} - {{ milestoneTitle }} ({{ winsToMilestone }} wins needed)</p>
        <div class="serieTime">
            <radial-progress-bar :diameter="100"
                                 :completed-steps="starsInMilestone - starsToMilestone"
                                 :strokeWidth="10"
                                 :total-steps="starsInMilestone"
                                 startColor="#1F2F4B"
                                 stopColor="#599CE9"
                                 innerStrokeColor="#DDDDDD">
                <p>Next<br/>milestone</p>
            </radial-progress-bar>
            <radial-progress-bar :diameter="100"
                                 :completed-steps="25 - rank"
                                 :strokeWidth="10"
                                 :total-steps="25"
                                 startColor="#463C3B"
                                 stopColor="#D3921F"
                                 innerStrokeColor="#DDDDDD">
                <p>Rank<br/>{{ rank }}</p>
            </radial-progress-bar>
            <radial-progress-bar :diameter="100"
                                 :completed-steps="getSerieTimeProgress"
                                 :strokeWidth="10"
                                 :total-steps="100"
                                 startColor="#505050"
                                 stopColor="#C0C0C0"
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
        'rankTitle', 'getSerieTimeProgress', 'getSerieTimeLeft',
        'starsInMilestone', 'starsToMilestone']),
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
