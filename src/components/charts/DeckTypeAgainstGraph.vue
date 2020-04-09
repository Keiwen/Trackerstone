
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
      ...mapGetters(['classStats', 'typesStats', 'generateTypeTitleLimit', 'sortList']),
      chartData () {
        let labels = []
        let dataList = []
        let backgrounds = []

        const sortField = this.currentOnly ? 'playedVsCurrent' : 'playedVs'
        let typesStatsList = []
        for (let idType in this.typesStats) {
          if (this.typesStats.hasOwnProperty(idType)) {
            typesStatsList.push(this.typesStats[idType])
          }
        }
        const typesSorted = this.sortList(typesStatsList, sortField).slice(0, 10)

        for (let i = 0; i < typesSorted.length; i++) {
          const type = typesSorted[i]
          if (type[sortField] === 0) continue
          labels.push(this.generateTypeTitleLimit(type))
          dataList.push(type[sortField])
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
