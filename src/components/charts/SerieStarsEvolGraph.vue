<template>
    <div>
        <line-chart :chart-data="chartData" :height="100" />
    </div>
</template>

<script>

  import LineChart from './LineChart'
  import { mapGetters } from 'vuex'

  export default {
    props: ['history'],
    components: {LineChart},
    computed: {
      ...mapGetters(['rank', 'stars']),
      chartData () {
        let labels = []
        let dataset = {
          label: 'Total stars',
          backgroundColor: '#f87979',
          data: []
        }

        for (let i = 0; i < this.history.length; i++) {
          labels.push(i)
          const game = this.history[i]
          const totalStars = this.getTotalStars(game.rank, game.stars)
          dataset.data.push(totalStars)
        }
        const totalStars = this.getTotalStars(this.rank, this.stars)
        labels.push('current')
        dataset.data.push(totalStars)

        return { labels: labels, datasets: [dataset] }
      }
    },
    methods: {
      getTotalStars (rank, stars) {
        return this.$store.getters.getTotalStars(rank, stars)
      }
    }
  }

</script>
