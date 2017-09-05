

<script>

  import { Line } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Line.extend({
    computed: {
      ...mapGetters(['rank', 'stars', 'getGamesList', 'getTotalStars']),
      chartData () {
        let labels = []
        let dataset = {
          label: 'Total stars',
          fill: false,
          backgroundColor: '#D3921F',
          borderColor: '#D3921F',
          data: []
        }

        const history = this.getGamesList()
        for (let i = 0; i < history.length; i++) {
          labels.push(i)
          const totalStars = this.getTotalStars(history[i].rank, history[i].stars)
          dataset.data.push(totalStars)
        }
        const totalStars = this.getTotalStars(this.rank, this.stars)
        labels.push('current')
        dataset.data.push(totalStars)

        return { labels: labels, datasets: [dataset] }
      },
      options () {
        return {
          legend: { display: false }
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  })

</script>
