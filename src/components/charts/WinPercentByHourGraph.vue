
<script>
  import { Bubble } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Bubble.extend({
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
    methods: {
      getEmptyPoint (i) {
        return {
          gameCount: 0,
          winCount: 0,
          x: i,
          y: 0,
          r: 0
        }
      },
      getPointToDisplay (pointData) {
        if (!pointData.gameCount) return pointData
        const winPercent = Math.round(pointData.winCount / pointData.gameCount * 100)
        pointData.r = pointData.gameCount
        pointData.y = winPercent
        return pointData
      }
    },
    computed: {
      ...mapGetters(['getGamesList', 'current']),
      chartData () {
        const history = this.getGamesList()
        let hours = []
        let hoursWeekend = []
        for (let i = 0; i < 24; i++) {
          hours.push(this.getEmptyPoint(i))
          hoursWeekend.push(this.getEmptyPoint(i))
        }

        // split history in hour range
        for (let i = 0; i < history.length; i++) {
          if (!history[i].gameDate) continue
          if (this.currentOnly && history[i].deck.id !== this.current.id) continue
          const dayInWeek = history[i].gameDate.dayInWeek
          if (dayInWeek === 0 || dayInWeek === 6) {
            hoursWeekend[history[i].gameDate.hour].gameCount++
            if (history[i].won) hoursWeekend[history[i].gameDate.hour].winCount++
          } else {
            hours[history[i].gameDate.hour].gameCount++
            if (history[i].won) hours[history[i].gameDate.hour].winCount++
          }
        }

        for (let i = 0; i < 24; i++) {
          hours[i] = this.getPointToDisplay(hours[i])
          hoursWeekend[i] = this.getPointToDisplay(hoursWeekend[i])
        }

        return {
          datasets: [
            {
              label: 'Week',
              data: hours,
              backgroundColor: '#D3921F'
            },
            {
              label: 'Weekend',
              data: hoursWeekend,
              backgroundColor: '#FFFFFF'
            }
          ]
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  })
</script>
