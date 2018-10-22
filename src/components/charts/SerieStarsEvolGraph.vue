
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
      ...mapGetters(['wildMode', 'rank', 'rankWild', 'stars', 'starsWild', 'getGamesList', 'getTotalStars', 'current']),
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
        let lastId = 0
        for (let i = 0; i < history.length; i++) {
          lastId = history[i].deck.id
          labels.push(i)
          if (this.currentOnly && lastId !== this.current.id) {
            // set non current deck point to 0 to follow evolution in the serie
            dataset.data.push(0)
          } else {
            let totalStars = 0
            if (this.wildMode) {
              totalStars = this.getTotalStars(history[i].rankWild, history[i].starsWild)
            } else {
              totalStars = this.getTotalStars(history[i].rank, history[i].stars)
            }
            dataset.data.push(totalStars)
          }
        }
        // do not display current stars if currentOnly while current didnt play last game
        if (!this.currentOnly || lastId === this.current.id) {
          let totalStars = 0
          if (this.wildMode) {
            totalStars = this.getTotalStars(this.rankWild, this.starsWild)
          } else {
            totalStars = this.getTotalStars(this.rank, this.stars)
          }
          labels.push('current')
          dataset.data.push(totalStars)
        }

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
