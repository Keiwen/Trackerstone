
<script>
  import { Line } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Line.extend({
    props: {
      currentOnly: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      currentOnly: function () {
        this.renderChart(this.chartData, this.options)
      }
    },
    computed: {
      ...mapGetters(['rank', 'highest', 'getGamesList', 'current']),
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
        let lastId = 0
        for (let i = 0; i < history.length; i++) {
          lastId = history[i].deck.id
          if (this.currentOnly && lastId !== this.current.id) continue
          labels.push(i)
          dataset.data.push(history[i].rank)
        }
        // do not display current rank if currentOnly while current didnt play last game
        if (!this.currentOnly || lastId === this.current.id) {
          labels.push('current')
          dataset.data.push(this.rank)
        }

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
