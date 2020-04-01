<template>
    <div class="container-fluid">
        <h3>Stats</h3>
        <p>{{ arenaPlayed }} completed</p>
        <p>{{ arenaAverageWin }} win average (max reached: {{ arenaMaxWin }})</p>
        <p>Combined record: {{ arenaGamesWon }} - {{ arenaGamesLoss }} ({{ arenaWinPercent }} % winrate)</p>
        <p>Gold prize: {{ totalGoldPrize }} total, {{ averageGoldPrize }} average</p>
        <p>Dust prize: {{ totalDustPrize }} total, {{ averageDustPrize }} average</p>
        <p>Gold balance: {{ getGoldBalance(true) }} refund with card pack, {{ getGoldBalance() }} arena refund</p>
        <see-chart-button routeName="arenaChart" />
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import SeeChartButton from '@/components/charts/SeeChartButton'

  export default {
    components: {SeeChartButton},
    computed: {
      ...mapGetters([
        'arenaGamesWon', 'arenaGamesLoss', 'arenaWinPercent',
        'arenaPlayed', 'arenaAverageWin', 'arenaMaxWin',
        'arenaWithPrize', 'getArenaTotalPrize', 'getArenaAveragePrize',
        'arenaFee', 'cardPackCost'
      ]),
      totalGoldPrize () {
        return this.getArenaTotalPrize('gold')
      },
      averageGoldPrize () {
        return this.getArenaAveragePrize('gold')
      },
      totalDustPrize () {
        return this.getArenaTotalPrize('dust')
      },
      averageDustPrize () {
        return this.getArenaAveragePrize('dust')
      }
    },
    methods: {
      getGoldBalance (includeCardPack) {
        let engageCost = this.arenaFee
        if (includeCardPack) engageCost -= this.cardPackCost
        return this.totalGoldPrize - (this.arenaWithPrize * engageCost)
      }
    }
  }
</script>
