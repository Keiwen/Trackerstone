<template>
    <div class="container-fluid">
        <div class="gamemodeSum arenaSum row">
            <div class="col-xs-2">
                <progress-circle :completed-steps="arenaGamesWonCurrent"
                                 :total-steps="12"
                                 :diameter="70"
                                 startColor="#25471E"
                                 stopColor="#66E85A"
                                 circleColor="#DDDDDD">
                    <p class="innerProgressCircle">{{ arenaGamesWonCurrent }}</p>
                </progress-circle>
            </div>
            <div class="col-xs-2">
                <progress-circle :completed-steps="arenaGamesLossCurrent"
                                 :total-steps="3"
                                 :diameter="70"
                                 startColor="#491F1F"
                                 stopColor="#E85A5A"
                                 circleColor="#DDDDDD">
                    <p class="innerProgressCircle">{{ arenaGamesLossCurrent}}</p>
                </progress-circle>
            </div>
            <div class="col-xs-4">
                <h4>{{ arenaKeyTitle() }} key</h4>
                <p>
                    {{ arenaWinPercentCurrent }} % winrate
                    <br/>
                    <win-loss v-for="(game, gameIndex) in currentGames" :game="game" :key="gameIndex" />
                </p>
            </div>
            <div class="col-xs-4">
                <h4>Gold balance</h4>
                <p>
                    Arena refund: <span :class="getGoldBalanceLabelClass()">{{ getGoldBalance() }}</span>
                    <br/>
                    With card pack: <span :class="getGoldBalanceLabelClass(true)">{{ getGoldBalance(true) }}</span>
                </p>
            </div>
        </div>

    </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import WinLoss from './WinLoss'
  import { ProgressCircle } from 'vue-progress-circle'

  export default {
    components: {WinLoss, ProgressCircle},
    computed: {
      ...mapGetters([
        'arenaGamesWonCurrent',
        'arenaGamesLossCurrent',
        'arenaWinPercentCurrent',
        'getArenaGamesList',
        'arenaWin',
        'arenaLoss',
        'arenaKeyTitle',
        'arenaFee',
        'cardPackCost',
        'arenaTotalPrize',
        'arenaWithPrize'
      ]),
      currentGames () {
        if (this.isNewArena) return []
        return this.getArenaGamesList(true)
      },
      totalGoldPrize () {
        return this.arenaTotalPrize('gold')
      },
      isNewArena () {
        return (this.arenaWin === 0 && this.arenaLoss === 0)
      }
    },
    methods: {
      getGoldBalance (includeCardPack) {
        let engageCost = this.arenaFee
        if (includeCardPack) engageCost -= this.cardPackCost
        return this.totalGoldPrize - (this.arenaWithPrize * engageCost)
      },
      getGoldBalanceLabelClass (includeCardPack) {
        return 'label label-' + ((this.getGoldBalance(includeCardPack) >= 0) ? 'success' : 'danger')
      }
    }
  }
</script>
