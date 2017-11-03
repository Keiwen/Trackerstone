
<script>
  import { Bubble } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Bubble.extend({
    computed: {
      ...mapGetters(['classStats', 'typesStats', 'generateTypeTitle', 'sortList']),
      chartData () {
        let labels = []
        let dataLists = []

        const typesSorted = this.sortList(this.typesStats, 'playedVs').reverse().slice(0, 10)

        for (let i = 0; i < typesSorted.length; i++) {
          const type = typesSorted[i]
          if (type['playedVs'] === 0) continue
          labels.push(this.generateTypeTitle(type))
          dataLists.push({
            label: this.generateTypeTitle(type),
            data: [{x: type['playedVs'], y: type['winPercentVs'], r: 10}],
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
