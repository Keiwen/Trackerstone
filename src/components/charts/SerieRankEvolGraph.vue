
<script>
  import { Line } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Line.extend({
    computed: {
      ...mapGetters(['rank', 'highest', 'getGamesList']),
      chartData () {
        let labels = []
        let dataset = {
          label: 'Rank',
          fill: false,
          backgroundColor: '#D3921F',
          borderColor: '#D3921F',
          data: []
        }

        const history = this.getGamesList()
        for (let i = 0; i < history.length; i++) {
          labels.push(i)
          dataset.data.push(history[i].rank)
        }
        labels.push('current')
        dataset.data.push(this.rank)

        return { labels: labels, datasets: [dataset] }
      },
      options () {
        return {
          scales: {
            yAxes: [{
              ticks: {
                reverse: true,
                min: this.highest,
                max: 25
              }
            }]
          },
          legend: { display: false }
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  })
</script>
