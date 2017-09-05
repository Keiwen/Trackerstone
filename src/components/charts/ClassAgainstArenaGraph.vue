
<script>

  import { Radar } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Radar.extend({
    computed: {
      ...mapGetters(['classStats']),
      chartData () {
        let labels = []
        let dataList = []
        let dataListWon = []
        let backgrounds = []

        for (let idClass in this.classStats) {
          if (idClass === '') continue
          if (!this.classStats.hasOwnProperty(idClass)) continue
          const hsClass = this.classStats[idClass]
          labels.push(hsClass['name'])
          dataList.push(hsClass['playedVsArena'])
          dataListWon.push(hsClass['wonVsArena'])
          backgrounds.push(hsClass['backgroundColor'])
        }

        let dataset = {
          label: 'Played',
          data: dataList,
          backgroundColor: 'rgba(193,65,65,0.3)'
        }
        let datasetWon = {
          label: 'Won',
          data: dataListWon,
          backgroundColor: 'rgba(43,196,43,0.7)'
        }

        return { labels: labels, datasets: [dataset, datasetWon] }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  })

</script>
