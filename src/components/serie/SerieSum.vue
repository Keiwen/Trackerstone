<template>
    <div class="container-fluid">
        <div class="gamemodeSum serieSum row">
            <div class="col-xs-4">
                <div class="col-xs-4">
                    <progress-circle :completed-steps="25 - (wildMode ? rankWild : rank)"
                                     :total-steps="25"
                                     :diameter="progressCircleDiameter"
                                     startColor="#463C3B"
                                     stopColor="#D3921F"
                                     circleColor="#DDDDDD">
                        <p class="innerProgressCircle">{{ wildMode ? rankWild : rank }}</p>
                    </progress-circle>
                </div>
                <div class="col-xs-8">
                    <h4>Rank</h4>
                    <p>{{ currentRankTitle }}<br/>{{ currentStars }} star<span v-if="currentStars > 1">s</span></p>
                </div>
            </div>
            <div class="col-xs-4">
                <div class="col-xs-4">
                    <progress-circle :completed-steps="starsInMilestone - starsToMilestone"
                                     :total-steps="starsInMilestone"
                                     :diameter="progressCircleDiameter"
                                     startColor="#1F2F4B"
                                     stopColor="#599CE9"
                                     circleColor="#DDDDDD">
                        <p class="innerProgressCircle">{{ nextMilestone}}</p>
                    </progress-circle>
                </div>
                <div class="col-xs-8">
                    <h4>Next milestone</h4>
                    <p>{{ milestoneTitle }}<br/>{{ winsToMilestone }} wins needed</p>
                </div>
            </div>
            <div class="col-xs-4">
                <div class="col-xs-4">
                    <progress-circle :completed-steps="getSerieTimeProgress"
                                     :total-steps="100"
                                     :diameter="progressCircleDiameter"
                                     startColor="#505050"
                                     stopColor="#C0C0C0"
                                     circleColor="#DDDDDD">
                        <p class="innerProgressCircle">{{ getSerieTimeLeft}}</p>
                    </progress-circle>
                </div>
                <div class="col-xs-8">
                    <h4>Days left</h4>
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
    components: {ProgressCircle},
    data () {
      return {
        progressCircleDiameter: 70
      }
    },
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
