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
            background: url('../../assets/ranks_sprite.png') 0 0 no-repeat;
            width: 80px;
            height: 100px;
            margin-left: 50px;
            &.rank-50 {
              background-position: 0 0;
            }
            &.rank-49 {
              background-position: 0 -100px;
            }
            &.rank-48 {
              background-position: 0 -200px;
            }
            &.rank-47 {
              background-position: 0 -300px;
            }
            &.rank-46 {
              background-position: 0 -400px;
            }
            &.rank-45 {
              background-position: 0 -500px;
            }
            &.rank-44 {
              background-position: 0 -600px;
            }
            &.rank-43 {
              background-position: 0 -700px;
            }
            &.rank-42 {
              background-position: 0 -800px;
            }
            &.rank-41 {
              background-position: 0 -900px;
            }
            &.rank-40 {
              background-position: -80px 0;
            }
            &.rank-39 {
              background-position: -80px -100px;
            }
            &.rank-38 {
              background-position: -80px -200px;
            }
            &.rank-37 {
              background-position: -80px -300px;
            }
            &.rank-36 {
              background-position: -80px -400px;
            }
            &.rank-35 {
              background-position: -80px -500px;
            }
            &.rank-34 {
              background-position: -80px -600px;
            }
            &.rank-33 {
              background-position: -80px -700px;
            }
            &.rank-32 {
              background-position: -80px -800px;
            }
            &.rank-31 {
              background-position: -80px -900px;
            }
            &.rank-30 {
              background-position: -160px 0;
            }
            &.rank-29 {
              background-position: -160px -100px;
            }
            &.rank-28 {
              background-position: -160px -200px;
            }
            &.rank-27 {
              background-position: -160px -300px;
            }
            &.rank-26 {
              background-position: -160px -400px;
            }
            &.rank-25 {
              background-position: -160px -500px;
            }
            &.rank-24 {
              background-position: -160px -600px;
            }
            &.rank-23 {
              background-position: -160px -700px;
            }
            &.rank-22 {
              background-position: -160px -800px;
            }
            &.rank-21 {
              background-position: -160px -900px;
            }
            &.rank-20 {
              background-position: -240px 0;
            }
            &.rank-19 {
              background-position: -240px -100px;
            }
            &.rank-18 {
              background-position: -240px -200px;
            }
            &.rank-17 {
              background-position: -240px -300px;
            }
            &.rank-16 {
              background-position: -240px -400px;
            }
            &.rank-15 {
              background-position: -240px -500px;
            }
            &.rank-14 {
              background-position: -240px -600px;
            }
            &.rank-13 {
              background-position: -240px -700px;
            }
            &.rank-12 {
              background-position: -240px -800px;
            }
            &.rank-11 {
              background-position: -240px -900px;
            }
            &.rank-10 {
              background-position: -320px 0;
            }
            &.rank-9 {
              background-position: -320px -100px;
            }
            &.rank-8 {
              background-position: -320px -200px;
            }
            &.rank-7 {
              background-position: -320px -300px;
            }
            &.rank-6 {
              background-position: -320px -400px;
            }
            &.rank-5 {
              background-position: -320px -500px;
            }
            &.rank-4 {
              background-position: -320px -600px;
            }
            &.rank-3 {
              background-position: -320px -700px;
            }
            &.rank-2 {
              background-position: -320px -800px;
            }
            &.rank-1 {
              background-position: -320px -900px;
            }
            &.rank-0 {
              background-position: -400px 0;
            }
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
