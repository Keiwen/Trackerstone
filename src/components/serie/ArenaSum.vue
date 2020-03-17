<template>
    <div class="container-fluid">
        <div class="gamemodeSum arenaSum row">
            <div class="col-xs-2">
                <ts-progress-circle :completed-steps="isNewArena ? 0 : arenaGamesWonCurrent"
                                    :total-steps="12"
                                    startColor="#25471E"
                                    stopColor="#66E85A"
                                    :inner-number="isNewArena ? 0 : arenaGamesWonCurrent">
                </ts-progress-circle>
            </div>
            <div class="col-xs-2">
                <ts-progress-circle :completed-steps="isNewArena ? 0 : arenaGamesLossCurrent"
                                    :total-steps="3"
                                    startColor="#491F1F"
                                    stopColor="#E85A5A"
                                    :inner-number="isNewArena ? 0 : arenaGamesLossCurrent">
                </ts-progress-circle>
            </div>
            <div class="col-xs-4 arenaKey">
                <h4>{{ arenaKeyTitle() }} key</h4>
                <p>
                    {{ arenaWinPercentCurrent }} % winrate
                    <br/>
                    <win-loss v-for="(game, gameIndex) in currentGames" :game="game" :key="gameIndex" />
                </p>
            </div>
            <div class="col-xs-4 arenaBalance">
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
  import TsProgressCircle from '@/components/charts/TSProgressCircle'

  export default {
    components: {WinLoss, TsProgressCircle},
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


<style lang="scss" scoped>

    .arenaSum {
        margin-bottom: 5px;
        h4 {
            margin-top: 0;
            margin-bottom: 0;
        }
        .arenaKey,.arenaBalance {
            > p {
                margin-bottom: 0;
            }
        }
    }

</style>
