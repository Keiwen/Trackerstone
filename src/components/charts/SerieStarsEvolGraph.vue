

<script>

  import { Line } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Line.extend({
    props: ['history'],
    computed: {
      ...mapGetters(['rank', 'stars']),
      chartData () {
        let labels = []
        let dataset = {
          label: 'Total stars',
          fill: false,
          backgroundColor: '#D3921F',
          borderColor: '#D3921F',
          data: []
        }

        for (let i = 0; i < this.history.length; i++) {
          labels.push(i)
          const game = this.history[i]
          const totalStars = this.getTotalStars(game.rank, game.stars)
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
    methods: {
      getTotalStars (rank, stars) {
        return this.$store.getters.getTotalStars(rank, stars)
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  })

</script>
