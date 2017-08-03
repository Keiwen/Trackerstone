
<script>

  import { Bar } from 'vue-chartjs'

  export default Bar.extend({
    props: ['decks'],
    computed: {
      chartData () {
        let labels = []
        let dataset = {
          label: 'Score',
          backgroundColor: '#D15C69',
          data: []
        }

        for (let idDeck in this.decks) {
          if (!this.decks.hasOwnProperty(idDeck)) continue
          const deck = this.decks[idDeck]
          const score = this.$store.getters.getWinScoreWithDeck(idDeck)
          if (score < 0) continue
          labels.push(this.getDeckTitle(deck))
          dataset.data.push(score)
        }

        return { labels: labels, datasets: [dataset] }
      },
      options () {
        return {
          legend: { display: false }
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
