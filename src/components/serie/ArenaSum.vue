<template>
    <div class="container-fluid">
        <h2>Arena</h2>
        <p>Completed: {{ arenaPlayed }} - average {{ arenaAverageWin }} won (max reached: {{ arenaMaxWin }})</p>
        <p>{{ arenaGamesWon }} total games won, {{ arenaGamesLoss }} loose ({{ arenaWinPercent }} % winrate)</p>
        <p>Gold prize: {{ totalGoldPrize }} total, {{ averageGoldPrize }} average</p>
        <p>Dust prize: {{ totalDustPrize }} total, {{ averageDustPrize }} average</p>
        <p>Gold balance: {{ getGoldBalance(true) }} refund with card pack, {{ getGoldBalance() }} arena refund</p>
        <router-link :to="{ name: 'arenaChart' }">See charts</router-link>
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'arenaGamesWon', 'arenaGamesLoss', 'arenaWinPercent',
        'arenaPlayed', 'arenaAverageWin', 'arenaMaxWin',
        'arenaWithPrize', 'arenaTotalPrize', 'arenaAveragePrize',
        'arenaFee', 'cardPackCost'
      ]),
      totalGoldPrize () {
        return this.arenaTotalPrize('gold')
      },
      averageGoldPrize () {
        return this.arenaAveragePrize('gold')
      },
      totalDustPrize () {
        return this.arenaTotalPrize('dust')
      },
      averageDustPrize () {
        return this.arenaAveragePrize('dust')
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
