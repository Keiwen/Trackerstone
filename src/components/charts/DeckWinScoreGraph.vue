
<script>

  import { Bar } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Bar.extend({
    computed: {
      ...mapGetters(['deckStats', 'className', 'generateDeckTitle']),
      chartData () {
        let labels = []
        let dataset = {
          label: 'Score',
          backgroundColor: '#D15C69',
          data: []
        }

        for (let idDeck in this.deckStats) {
          if (!this.deckStats.hasOwnProperty(idDeck)) continue
          const deck = this.deckStats[idDeck]
          if (deck['winScoreWith'] < 0) continue
          labels.push(this.generateDeckTitle(deck))
          dataset.data.push(deck['winScoreWith'])
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
