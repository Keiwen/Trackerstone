<template>
    <div class="container-fluid">
        <h2>Serie</h2>
        <div class="serieTime row">
          <div class="col-xs-4">
            <progress-circle :completed-steps="25 - (wildMode ? rankWild : rank)"
                             :total-steps="25"
                             startColor="#463C3B"
                             stopColor="#D3921F"
                             circleColor="#DDDDDD">
              <p>Rank<br/>{{ wildMode ? rankWild : rank }}</p>
            </progress-circle>
            <div>
              <p>{{ currentRankTitle }}<br/>{{ currentStars }} star<span v-if="currentStars > 1">s</span></p>
            </div>
          </div>
          <div class="col-xs-4">
            <progress-circle :completed-steps="starsInMilestone - starsToMilestone"
                             :total-steps="starsInMilestone"
                             startColor="#1F2F4B"
                             stopColor="#599CE9"
                             circleColor="#DDDDDD">
              <p>Next<br/>milestone</p>
            </progress-circle>
            <div>
              <p>{{ nextMilestone}} - {{ milestoneTitle }}<br/>{{ winsToMilestone }} wins needed</p>
              </div>
          </div>
          <div class="col-xs-4">
            <progress-circle :completed-steps="getSerieTimeProgress"
                             :total-steps="100"
                             startColor="#505050"
                             stopColor="#C0C0C0"
                             circleColor="#DDDDDD">
              <p>{{ getSerieTimeLeft }}<br/>days left</p>
            </progress-circle>
            <div>
              <p>Current chest<br/>{{ highest }}</p>
            </div>
          </div>
        </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { ProgressCircle } from 'vue-progress-circle'

export default {
  components: { ProgressCircle },
  computed: {
    ...mapGetters(['rank', 'stars', 'highest', 'nextMilestone', 'winsToMilestone',
      'gamesPlayed', 'gamesWon', 'winRate', 'current', 'opponent', 'recentNumberGames',
      'rankTitle', 'getSerieTimeProgress', 'getSerieTimeLeft',
      'starsInMilestone', 'starsToMilestone',
      'rankWild', 'starsWild', 'wildMode'
    ]),
    currentRankTitle () {
      return this.rankTitle()
    },
    currentStars () {
      return this.wildMode ? this.starsWild : this.stars
    },
    milestoneTitle () {
      return this.rankTitle(this.nextMilestone)
    }
  }
}
</script>


<style>
.circle-progress-container {
  display: inline-block;
}
</style>
