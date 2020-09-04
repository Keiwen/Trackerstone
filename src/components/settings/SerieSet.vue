<template>
    <div class="container-fluid">
        <div class="container-fluid">
            <form class="form-horizontal">
                <div class="col-xs-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">Standard</div>
                        <div class="panel-body">
                            <div class="form-group">
                                <label class="control-label col-xs-6 col-sm-4" for="newLeague">League:</label>
                                <div class="col-xs-6 col-sm-8">
                                    <select v-model="newLeague" id="newLeague" class="form-control" >
                                        <option v-for="leagueName in rankLeagues" :value="leagueName">{{ leagueName }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-6 col-sm-4" for="newSubRank">Rank:</label>
                                <div class="col-xs-6 col-sm-8">
                                    <input type="number" class="form-control" id="newSubRank" v-model="newSubRank">
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
                                <label class="control-label col-xs-6 col-sm-4" for="newLeague">League:</label>
                                <div class="col-xs-6 col-sm-8">
                                    <select v-model="newLeagueWild" id="newLeagueWild" class="form-control" >
                                        <option v-for="leagueName in rankLeagues" :value="leagueName">{{ leagueName }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-xs-6 col-sm-4" for="newSubRankWild">Rank:</label>
                                <div class="col-xs-6 col-sm-8">
                                    <input type="number" class="form-control" id="newSubRankWild" v-model="newSubRankWild">
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
        newLeague: 'Bronze',
        newSubRank: 10,
        newStars: 0,
        newWinStreak: 0,
        newStarsMult: 1,
        newLeagueWild: 'Bronze',
        newSubRankWild: 10,
        newStarsWild: 0,
        newWinStreakWild: 0,
        newStarsMultWild: 1
      }
    },
    computed: {
      ...mapGetters(['rank', 'stars', 'winStreak', 'starsMult',
        'rankWild', 'starsWild', 'winStreakWild', 'starsMultWild',
        'rankLeagues', 'getRankFromLeague', 'getRankData'
      ])
    },
    methods: {
      ...mapActions(['setSerieData', 'cancelLastGame']),
      initialize () {
        const rankData = this.getRankData(this.rank)
        const rankDataWild = this.getRankData(this.rankWild)
        this.newLeague = rankData['league']
        this.newSubRank = rankData['rank']
        this.newStars = this.stars
        this.newWinStreak = this.winStreak
        this.newStarsMult = this.starsMult
        this.newLeagueWild = rankDataWild['league']
        this.newSubRankWild = rankDataWild['rank']
        this.newStarsWild = this.starsWild
        this.newWinStreakWild = this.winStreakWild
        this.newStarsMultWild = this.starsMultWild
      },
      set () {
        const newRank = this.getRankFromLeague(this.newLeague, parseInt(this.newSubRank))
        const newRankWild = this.getRankFromLeague(this.newLeagueWild, parseInt(this.newSubRankWild))
        const dataSet = {
          rank: newRank,
          stars: this.newStars,
          winStreak: this.newWinStreak,
          starsMult: this.newStarsMult,
          rankWild: newRankWild,
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
