<template>
    <div class="container-fluid">
        <div class="gamemodeSum serieSum row">
            <div class="col-xs-4 rankhome">

                <div class="col-xs-7">
                    <div :class="'rankbadge rank-' + (wildMode ? rankWild : rank)"></div>
                </div>
                <div class="col-xs-5">
                    <div>
                      <h2>Rank</h2>
                        <span v-for="i in currentStars" class="serieStar serieStar-on">X</span>
                        <span v-for="i in (currentMaxStars - currentStars)" class="serieStar serieStar-off">-</span>
                    </div>
                    <p>{{ currentRankTitle }}</p>
                </div>
            </div>
            <div class="col-xs-4 milestonehome">
                <h2>Next milestone</h2>
                <div class="col-xs-6 info">
                    Stars left
                    <progress-circle :completed-steps="starsInMilestone - starsToMilestone"
                                     :total-steps="starsInMilestone"
                                     :diameter="progressCircleDiameter"
                                     startColor="#321D05"
                                     stopColor="#FF911C"
                                     circleColor="#DDDDDD">
                        <p class="innerProgressCircle">{{ starsToMilestone }}</p>
                    </progress-circle>
                </div>
                <div class="col-xs-6 info">
                    Days left
                    <progress-circle :completed-steps="getSerieTimeProgress"
                                     :total-steps="100"
                                     :diameter="progressCircleDiameter"
                                     startColor="#1F2F4B"
                                     stopColor="#00A8E5"
                                     circleColor="#DDDDDD">
                        <p class="innerProgressCircle">{{ getSerieTimeLeft}}</p>
                    </progress-circle>
                </div>
            </div>
            <div class="col-xs-4 chesthome">
                <h2>Current chest</h2>
                <div :class="'serieChest serieChest-' + highest"></div>
                <div class="row">
                    <p>
                        Next chest in <strong>{{ winsToNextChest }}</strong>
                        <span v-if="winsToNextChest === 1">win</span>
                        <span v-else>consecutive wins</span>
                    </p>
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
        progressCircleDiameter: 60
      }
    },
    computed: {
      ...mapGetters(['rank', 'stars', 'highest', 'nextMilestone', 'winsToMilestone',
        'gamesPlayed', 'gamesWon', 'winRate', 'current', 'opponent', 'recentNumberGames',
        'rankTitle', 'getSerieTimeProgress', 'getSerieTimeLeft',
        'starsInMilestone', 'starsToMilestone', 'winsToNextChest',
        'rankWild', 'starsWild', 'wildMode', 'rankStars'
      ]),
      currentRankTitle () {
        return this.rankTitle()
      },
      currentStars () {
        return this.wildMode ? this.starsWild : this.stars
      },
      currentMaxStars () {
        return this.wildMode ? this.rankStars(this.rankWild) : this.rankStars(this.rank)
      },
      milestoneTitle () {
        return this.rankTitle(this.nextMilestone)
      }
    }
  }
</script>

<style lang="scss" scoped>

.gamemodeSum  {
  margin-top: 15px;

    .col-xs-4,.col-xs-8,.col-xs-7,.col-xs-5 {
      padding-right: 0;
      padding-left: 0;
    }

    .rankhome {
      .rankbadge {
        width: 105px;
        height: 130px;
        background-color: var(--main-color);
      }

    }

    .milestonehome {

      .info {margin-top: 5px}

      .circle-progress-container {
          position: relative;
          margin: 0 auto;
          
          &:before {
            content:'';
            width: 38px;
            height:38px;
            position: absolute;
            background-color: var(--white);
            border-radius: 50%;
            width: 38px;
            left: 11px;
            top: 11px;
          }

      }

      p.innerProgressCircle {
        margin-top: 7px;
        font-size: 20px;
        display: block;
        font-weight: bold;
      }

    }

}


</style>
