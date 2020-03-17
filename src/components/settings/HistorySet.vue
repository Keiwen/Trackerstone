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
      ...mapActions(['addSuccess', 'setRecentGamesNumber', 'setScoreCoef']),
      set () {
        if (this.newRecentGames !== this.recentNumberGames) {
          this.setRecentGamesNumber(this.newRecentGames)
          this.$ga.event('settings', 'set', 'recentGames', this.newRecentGames)
        }
        if (this.newScoreCoef !== this.scoreCoef) {
          this.setScoreCoef(this.newScoreCoef)
          this.$ga.event('settings', 'set', 'scoreCoef', this.newScoreCoef)
        }
        this.addSuccess('History data set')
      }
    },
    mounted () {
      this.newRecentGames = this.recentNumberGames
      this.newScoreCoef = this.scoreCoef
    }
  }
</script>

<style lang="scss" scoped>
    .btn-setting {
        margin-top: 20px;
    }

    .form-group {
        margin-bottom: 0;
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
