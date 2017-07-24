
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
          const recentGamesList = this.$store.getters.getGamesWithDeck(idDeck, true)
          const recentPlayed = recentGamesList.length
          let winPercent = 0
          let recentWinPercent = 0
          if (played !== 0) {
            const won = gamesList.filter(game => {
              return game['won'] === true
            }).length
            winPercent = Math.round((won / played) * 100)
          }
          if (recentPlayed !== 0) {
            const recentWon = recentGamesList.filter(game => {
              return game['won'] === true
            }).length
            recentWinPercent = Math.round((recentWon / recentPlayed) * 100)
          }
          datasetGlobal.data.push(winPercent)
          datasetRecent.data.push(recentWinPercent)
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
