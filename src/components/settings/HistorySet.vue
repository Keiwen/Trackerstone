<template>
    <div class="container-fluid">
        <form class="form-horizontal">
            <div class="col-xs-7">
                <div class="panel panel-default">
                    <div class="panel-heading">Score</div>
                    <div class="panel-body">
                        <i>
                            Score is calculated from your winrate and its
                            maximum depends on number games.
                        </i>
                        <div class="form-group">
                            <label class="control-label col-xs-6 col-sm-4" for="newScoreCoef">Coefficient:</label>
                            <div class="col-xs-6 col-sm-8">
                                <input type="number" class="form-control" id="newScoreCoef" v-model="newScoreCoef">
                            </div>
                        </div>
                        <i>
                            Default is 30. You get ~80&nbsp;% of full possible score after 5 games.
                            You'll need a 300 coefficient for 10 games instead.
                        </i>
                    </div>
                </div>
            </div>
            <div class="col-xs-5">
                <div class="panel panel-default">
                    <div class="panel-heading">Recent games</div>
                    <div class="panel-body">
                        <div class="form-group">
                            <label class="control-label col-xs-6 col-sm-4" for="newRecentGames">Number of games:</label>
                            <div class="col-xs-6 col-sm-8">
                                <input type="number" class="form-control" id="newRecentGames" v-model="newRecentGames">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </form>

        <button @click="set()" class="btn btn-success btn-setting">Save</button>

    </div>
</template>


<script>
  import * as storeMut from '@/store/mutation-types'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        newRecentGames: 10,
        newScoreCoef: 30
      }
    },
    computed: {
      ...mapGetters(['recentNumberGames', 'scoreCoef'])
    },
    methods: {
      ...mapActions(['addSuccess']),
      set () {
        this.$store.commit(storeMut.SET_RECENT_GAMES_NUMBER, this.newRecentGames)
        this.$store.commit(storeMut.SET_SCORE_COEF, this.newScoreCoef)
        this.addSuccess('History data set')
      }
    },
    mounted: function () {
      this.newRecentGames = this.recentNumberGames
      this.newScoreCoef = this.scoreCoef
    }
  }
</script>

<style>
    .btn-setting {
        margin-top: 20px;
    }

    .form-group {
        margin-bottom: 0;
    }

    .panel-heading {
        padding-top: 5px;
        padding-bottom: 5px;
    }

</style>
