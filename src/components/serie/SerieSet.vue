<template>
    <div class="container-fluid">
        <h2>Serie data</h2>

        <form class="form-horizontal">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading">Standard</div>
                    <div class="panel-body">
                        <div class="form-group">
                            <label class="control-label col-xs-6 col-sm-3" for="newRank">Rank:</label>
                            <div class="col-xs-6 col-sm-9">
                                <input type="number" class="form-control" id="newRank" v-model="newRank">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-xs-6 col-sm-3" for="newStars">Stars:</label>
                            <div class="col-xs-6 col-sm-9">
                                <input type="number" class="form-control" id="newStars" v-model="newStars">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-xs-6 col-sm-3" for="newWinStreak">Win streak:</label>
                            <div class="col-xs-6 col-sm-9">
                                <input type="number" class="form-control" id="newWinStreak" v-model="newWinStreak">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading">Wild</div>
                    <div class="panel-body">
                        <div class="form-group">
                            <label class="control-label col-xs-6 col-sm-3" for="newRankWild">Rank:</label>
                            <div class="col-xs-6 col-sm-9">
                                <input type="number" class="form-control" id="newRankWild" v-model="newRankWild">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-xs-6 col-sm-3" for="newStarsWild">Stars:</label>
                            <div class="col-xs-6 col-sm-9">
                                <input type="number" class="form-control" id="newStarsWild" v-model="newStarsWild">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-xs-6 col-sm-3" for="newWinStreakWild">Win streak:</label>
                            <div class="col-xs-6 col-sm-9">
                                <input type="number" class="form-control" id="newWinStreakWild" v-model="newWinStreakWild">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="form-group">
                            <label class="control-label col-xs-6 col-sm-3" for="newHighest">Chest:</label>
                            <div class="col-xs-6 col-sm-9">
                              <input type="number" class="form-control" id="newHighest" v-model="newHighest">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <br/>
        <button @click="set()" class="btn btn-success btn-setting">Ok</button>
    </div>
</template>


<script>

  import * as storeMut from '@/store/mutation-types'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        newRank: 25,
        newStars: 0,
        newWinStreak: 0,
        newRankWild: 25,
        newStarsWild: 0,
        newWinStreakWild: 0,
        newHighest: 25
      }
    },
    computed: {
      ...mapGetters(['rank', 'stars', 'highest', 'winStreak', 'rankWild', 'starsWild', 'winStreakWild', 'highest'])
    },
    methods: {
      ...mapActions(['addSuccess']),
      set () {
        const dataSet = {
          rank: this.newRank,
          stars: this.newStars,
          winStreak: this.newWinStreak,
          rankWild: this.newRankWild,
          starsWild: this.newStarsWild,
          winStreakWild: this.newWinStreakWild,
          highest: this.newHighest
        }
        this.$store.commit(storeMut.SET_SERIE_DATA, dataSet)
        this.addSuccess('Serie data set')
        this.redirectToSerie()
      },
      redirectToSerie () {
        this.$router.push({ name: 'serie' })
      }
    },
    mounted: function () {
      this.newRank = this.rank
      this.newStars = this.stars
      this.newWinStreak = this.winStreak
      this.newRankWild = this.rankWild
      this.newStarsWild = this.starsWild
      this.newWinStreakWild = this.winStreakWild
      this.newHighest = this.highest
    }
  }

</script>

<style>
    .btn-setting {
        margin-top: 20px;
    }

</style>
