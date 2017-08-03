
<script>

  import { Bar } from 'vue-chartjs'

  export default Bar.extend({
    props: ['decks'],
    computed: {
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

        for (let idDeck in this.decks) {
          if (!this.decks.hasOwnProperty(idDeck)) continue
          const deck = this.decks[idDeck]
          const gamesList = this.$store.getters.getGamesWithDeck(idDeck)
          const played = gamesList.length
          if (played === 0) continue
          labels.push(this.getDeckTitle(deck))
          datasetGlobal.data.push(this.$store.getters.getWinPercentWithDeck(idDeck))
          datasetRecent.data.push(this.$store.getters.getWinPercentWithDeck(idDeck, true))
        }

        return { labels: labels, datasets: [datasetGlobal, datasetRecent] }
      },
      options () {
        return {
          legend: { display: true }
        }
      }
    },
    methods: {
      getClassName (id) {
        return this.$store.getters.className(id)
      },
      getDeckTitle (deck) {
        const className = this.getClassName(deck.type.hsClass)
        return deck.name + ' (' + className + ' ' + deck.type.name + ')'
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  })

</script>
