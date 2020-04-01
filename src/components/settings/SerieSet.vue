<template>
    <div class="container-fluid">
        <div class="container-fluid">
            <form class="form-horizontal">
                <div class="col-xs-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">Standard</div>
                        <div class="panel-body">
                            <div class="form-group">
                                <label class="control-label col-xs-6 col-sm-4" for="newRank">Rank:</label>
                                <div class="col-xs-6 col-sm-8">
                                    <input type="number" class="form-control" id="newRank" v-model="newRank">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-6 col-sm-4" for="newStars">Stars:</label>
                                <div class="col-xs-6 col-sm-8">
                                    <input type="number" class="form-control" id="newStars" v-model="newStars">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-6 col-sm-4" for="newWinStreak">Win streak:</label>
                                <div class="col-xs-6 col-sm-8">
                                    <input type="number" class="form-control" id="newWinStreak" v-model="newWinStreak">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-6 col-sm-4" for="newStarsMult">Star multiplier:</label>
                                <div class="col-xs-6 col-sm-8">
                                    <input type="number" class="form-control" id="newStarsMult" v-model="newStarsMult">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">Wild</div>
                        <div class="panel-body">
                            <div class="form-group">
                                <label class="control-label col-xs-6 col-sm-4" for="newRankWild">Rank:</label>
                                <div class="col-xs-6 col-sm-8">
                                    <input type="number" class="form-control" id="newRankWild" v-model="newRankWild">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-6 col-sm-4" for="newStarsWild">Stars:</label>
                                <div class="col-xs-6 col-sm-8">
                                    <input type="number" class="form-control" id="newStarsWild" v-model="newStarsWild">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-6 col-sm-4" for="newWinStreakWild">Win streak:</label>
                                <div class="col-xs-6 col-sm-8">
                                    <input type="number" class="form-control" id="newWinStreakWild" v-model="newWinStreakWild">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-6 col-sm-4" for="newStarsMultWild">Star multiplier:</label>
                                <div class="col-xs-6 col-sm-8">
                                    <input type="number" class="form-control" id="newStarsMultWild" v-model="newStarsMultWild">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <button @click="set()" class="btn btn-success btn-setting">Save</button>

        </div>

        <button @click="rollbackLastGame()" class="btn btn-warning">Cancel last game</button>

    </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        newRank: 25,
        newStars: 0,
        newWinStreak: 0,
        newStarsMult: 1,
        newRankWild: 25,
        newStarsWild: 0,
        newWinStreakWild: 0,
        newStarsMultWild: 1
      }
    },
    computed: {
      ...mapGetters(['rank', 'stars', 'winStreak', 'starsMult',
        'rankWild', 'starsWild', 'winStreakWild', 'starsMultWild'
      ])
    },
    methods: {
      ...mapActions(['setSerieData', 'cancelLastGame']),
      initialize () {
        this.newRank = this.rank
        this.newStars = this.stars
        this.newWinStreak = this.winStreak
        this.newStarsMult = this.starsMult
        this.newRankWild = this.rankWild
        this.newStarsWild = this.starsWild
        this.newWinStreakWild = this.winStreakWild
        this.newStarsMultWild = this.starsMultWild
      },
      set () {
        const dataSet = {
          rank: this.newRank,
          stars: this.newStars,
          winStreak: this.newWinStreak,
          starsMult: this.newStarsMult,
          rankWild: this.newRankWild,
          starsWild: this.newStarsWild,
          winStreakWild: this.newWinStreakWild,
          starsMultWild: this.newStarsMultWild
        }
        this.setSerieData(dataSet)
        this.$ga.event('settings', 'set', 'serieData')
      },
      rollbackLastGame () {
        this.cancelLastGame()
        this.initialize()
        this.$ga.event('history', 'cancel', 'removeLast')
      }
    },
    mounted () {
      this.initialize()
    }
  }
</script>

<style lang="scss" scoped>
    .btn-setting {
        margin-top: 20px;
    }

    .form-group {
        margin-bottom: 2px;
    }

    .panel-default {

        border-color: var(--second-bg);

        .panel-heading {
            padding-top: 5px;
            padding-bottom: 5px;
            background: var(--second-bg);
            border-color: var(--second-bg);
        }

        .panel-body {
            background: var(--main-bg);
        }
    }


</style>
