
<script>
  import { Pie } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Pie.extend({
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
      ...mapGetters(['classStats']),
      chartData () {
        let labels = []
        let dataList = []
        let backgrounds = []

        for (let idClass in this.classStats) {
          if (!this.classStats.hasOwnProperty(idClass)) continue
          const hsClass = this.classStats[idClass]
          labels.push(hsClass['name'])
          dataList.push(this.currentOnly ? hsClass['playedVsCurrent'] : hsClass['playedVs'])
          backgrounds.push(hsClass['backgroundColor'])
        }

        let dataset = {
          label: 'Played',
          data: dataList,
          backgroundColor: backgrounds
        }

        return { labels: labels, datasets: [dataset] }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  })
</script>
