
<script>
  import { Pie } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Pie.extend({
    props: ['currentOnly'],
    watch: {
      currentOnly: function () {
        this.renderChart(this.chartData, this.options)
      }
    },
    computed: {
      ...mapGetters(['classStats', 'archetypesStats']),
      chartData () {
        let labels = []
        let dataList = []
        let backgrounds = []

        for (let idArch in this.archetypesStats) {
          if (!this.archetypesStats.hasOwnProperty(idArch)) continue
          const archetype = this.archetypesStats[idArch]
          labels.push(archetype['id'])
          dataList.push(this.currentOnly ? archetype['playedVsCurrent'] : archetype['playedVs'])
          backgrounds.push(archetype['backgroundColor'])
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
