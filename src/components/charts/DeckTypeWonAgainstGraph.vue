
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
    computed: {
      ...mapGetters(['classStats', 'typesStats', 'generateTypeTitleLimit', 'sortList', 'current']),
      chartData () {
        let labels = []
        let dataLists = []

        const sortField = this.currentOnly ? 'playedVsCurrent' : 'playedVs'
        const percentField = this.currentOnly ? 'winPercentVsCurrent' : 'winPercentVs'
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
          dataLists.push({
            label: this.generateTypeTitleLimit(type),
            data: [{x: type[sortField], y: type[percentField], r: 10}],
            backgroundColor: this.classStats[type['hsClass']]['backgroundColor']
          })
        }

        return { labels: labels, datasets: dataLists }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  })
</script>
