
<script>

  import { Pie } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Pie.extend({
    props: ['history'],
    computed: {
      ...mapGetters(['classes']),
      chartData () {
        let labels = []
        let dataList = []
        let backgrounds = []
        let countClasses = this.classes
        for (let hsClass in countClasses) {
          if (countClasses.hasOwnProperty(hsClass)) {
            labels.push(countClasses[hsClass]['name'])
            countClasses[hsClass]['played'] = 0
          }
        }
        for (let i = 0; i < this.history.length; i++) {
          countClasses[this.history[i].opponent.hsClass]['played']++
        }
        for (let hsClass in countClasses) {
          if (countClasses.hasOwnProperty(hsClass)) {
            dataList.push(countClasses[hsClass]['played'])
            backgrounds.push(countClasses[hsClass]['backgroundColor'])
          }
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
