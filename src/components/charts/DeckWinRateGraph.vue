
<script>
  import { Bar } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Bar.extend({
    computed: {
      ...mapGetters(['deckStats', 'className', 'generateDeckTitleLimit']),
      chartData () {
        let labels = []
        let datasetGlobal = {
          label: 'Global',
          backgroundColor: '#D15C69',
          data: []
        }
        let datasetRecent = {
          label: 'Recent',
          backgroundColor: '#00C2D3',
          data: []
        }

        for (let idDeck in this.deckStats) {
          if (!this.deckStats.hasOwnProperty(idDeck)) continue
          const deck = this.deckStats[idDeck]
          if (deck['playedWith'] === 0) continue
          labels.push(this.generateDeckTitleLimit(deck))
          datasetGlobal.data.push(deck['winPercentWith'])
          datasetRecent.data.push(deck['winPercentWithRecent'])
        }

        return { labels: labels, datasets: [datasetGlobal, datasetRecent] }
      },
      options () {
        return {
          legend: { display: true }
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  })
</script>
