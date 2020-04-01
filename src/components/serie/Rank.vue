<template>
    <div class="rankhome">
        <div class="col-xs-6">
            <div :class="'rankbadge rank-' + currentRank"></div>
        </div>
        <div class="col-xs-6">
            <div>
              <h2>Rank</h2>
                <span v-for="i in currentStars" class="serieStar serieStar-on"></span>
                <span v-for="i in (currentMaxStars - currentStars)" class="serieStar serieStar-off"></span>
            </div>
            <p>
                {{ currentRankTitle }}
                <br/>
                <i v-if="currentStarsMult > 1">x{{ currentStarsMult }} multiplier</i>
            </p>
        </div>
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['currentRank', 'currentStars', 'currentStarsMult',
        'getRankLevel', 'getRankStars'
      ]),
      currentRankTitle () {
        return this.getRankLevel()
      },
      currentMaxStars () {
        return this.getRankStars()
      }
    }
  }
</script>

<style lang="scss" scoped>

    .rankhome {
        .col-xs-6 {
            padding-right: 0;
            padding-left: 0;
        }
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


</style>
