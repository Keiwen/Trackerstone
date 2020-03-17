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
                        <span v-for="i in currentStars" class="serieStar serieStar-on"></span>
                        <span v-for="i in (currentMaxStars - currentStars)" class="serieStar serieStar-off"></span>
                    </div>
                    <p>{{ currentRankTitle }}</p>
                </div>
            </div>
            <div class="col-xs-4 milestonehome">
                <h2>Next milestone</h2>
                <div class="col-xs-6 info">
                    Stars left
                    <ts-progress-circle :completed-steps="starsInMilestone - starsToMilestone"
                                     :total-steps="starsInMilestone"
                                     startColor="#321D05"
                                     stopColor="#FF911C"
                                     :inner-text="starsToMilestone">
                    </ts-progress-circle>
                </div>
                <div class="col-xs-6 info">
                    Days left
                    <ts-progress-circle :completed-steps="getSerieTimeProgress"
                                        :total-steps="100"
                                        startColor="#1F2F4B"
                                        stopColor="#00A8E5"
                                        :inner-text="getSerieTimeLeft">
                    </ts-progress-circle>
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
  import TsProgressCircle from '@/components/charts/TSProgressCircle'

  export default {
    components: {TsProgressCircle},
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

    .col-xs-4,.col-xs-8,.col-xs-7,.col-xs-5 {
      padding-right: 0;
      padding-left: 0;
    }

    .rankhome {
      .rankbadge {
        display: block;
        position: relative;
        background: url('../../assets/spriteHS.png') 0 0 no-repeat;
        width: 105px;
        height: 120px;
        background-size: 600px 600px;
      }

      .rank-25 {
        background-position: 0 0;
      }
      .rank-24 {
        background-position: -120px 0;
      }
      .rank-23 {
        background-position: -240px 0;
      }
      .rank-22 {
        background-position: -360px 0;
      }
      .rank-21 {
        background-position: -480px 0;
      }
      .rank-20 {
        background-position: 0 -120px;
      }
      .rank-19 {
        background-position: -120px -120px;
      }
      .rank-18 {
        background-position: -240px -120px;
      }
      .rank-17 {
        background-position: -360px -120px;
      }
      .rank-16 {
        background-position: -480px -120px;
      }
      .rank-15 {
        background-position: 0 -240px;
      }
      .rank-14 {
        background-position: -120px -240px;
      }
      .rank-13 {
        background-position: -240px -240px;
      }
      .rank-12 {
        background-position: -360px -240px;
      }
      .rank-11 {
        background-position: -480px -240px;
      }
      .rank-10 {
        background-position: 0 -360px;
      }
      .rank-9 {
        background-position: -120px -360px;
      }
      .rank-8 {
        background-position: -240px -360px;
      }
      .rank-7 {
        background-position: -360px -360px;
      }
      .rank-6 {
        background-position: -480px -360px;
      }
      .rank-5 {
        background-position: 0 -480px;
      }
      .rank-4 {
        background-position: -120px -480px;
      }
      .rank-3 {
        background-position: -240px -480px;
      }
      .rank-2 {
        background-position: -360px -480px;
      }
      .rank-1 {
        background-position: -480px -480px;
      }

      .serieStar {
        padding: 15px 0 15px 0;
        width: 15px;
        height: 15px;
        display: inline-block;
        visibility: hidden;
      }
        .serieStar-on {
          position: relative;
          width: 15px;
          height: 15px;

        &:before {
          content:'';
          position: absolute;
          visibility: visible;
          top: 10px;
          left: 0;
          width: 15px;
          height: 15px;
          background: url('../../assets/star.svg') 0 0 no-repeat;
          }
      }

      .serieStar-off {
        position: relative;
        width: 15px;
        height: 15px;

      &:before {
        content:'';
        position: absolute;
        visibility: visible;
        top: 10px;
        left: -3px;
        width: 15px;
        height: 15px;
        background: url('../../assets/star.svg') 0 0 no-repeat;
        filter: brightness(0%);
        opacity:0.4;
        }
    }


    }

    .milestonehome {

      .info {margin-top: 5px}

    }

}


</style>
