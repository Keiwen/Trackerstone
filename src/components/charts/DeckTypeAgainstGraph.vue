
<script>
  import { Pie } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Pie.extend({
    computed: {
      ...mapGetters(['classStats', 'typesStats', 'generateTypeTitle', 'sortList']),
      chartData () {
        let labels = []
        let dataList = []
        let backgrounds = []

        const typesSorted = this.sortList(this.typesStats, 'playedVs').slice(0, 10)

        for (let i = 0; i < typesSorted.length; i++) {
          const type = typesSorted[i]
          if (type['playedVs'] === 0) continue
          labels.push(this.generateTypeTitle(type))
          dataList.push(type['playedVs'])
          backgrounds.push(this.classStats[type['hsClass']]['backgroundColor'])
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
