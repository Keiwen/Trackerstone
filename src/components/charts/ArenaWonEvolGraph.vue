
<script>
  import { Line } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Line.extend({
    computed: {
      ...mapGetters(['getArenaList', 'className']),
      chartData () {
        let labels = []
        let dataset = {
          label: 'Win',
          fill: false,
          backgroundColor: '#D3921F',
          borderColor: '#D3921F',
          data: []
        }

        const history = this.getArenaList()
        for (let i = 0; i < history.length; i++) {
          labels.push(i + ' - ' + this.className(history[i]['hsClass']))
          dataset.data.push(history[i]['win'])
        }

        return { labels: labels, datasets: [dataset] }
      },
      options () {
        return {
          scales: {
            yAxes: [{
              ticks: {
                // reverse: true,
                min: 0,
                max: 12
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
