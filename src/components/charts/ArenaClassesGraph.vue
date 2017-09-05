
<script>

  import { Bubble } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Bubble.extend({
    computed: {
      ...mapGetters(['classStats']),
      chartData () {
        let labels = []
        let dataLists = []

        for (let idClass in this.classStats) {
          if (idClass === '') continue
          if (!this.classStats.hasOwnProperty(idClass)) continue
          const hsClass = this.classStats[idClass]
          if (hsClass['completeWithArena'] === 0) continue
          labels.push(hsClass['name'])
          let dataset = {
            label: hsClass['name'],
            data: [{x: hsClass['completeWithArena'], y: hsClass['averageWinWithArena'], r: 10}],
            backgroundColor: hsClass['backgroundColor']
          }
          dataLists.push(dataset)
        }

        return { labels: labels, datasets: dataLists }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  })

</script>
