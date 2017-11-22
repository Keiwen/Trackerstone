
<script>
  import { Line } from 'vue-chartjs'
  import { mapGetters } from 'vuex'

  export default Line.extend({
    computed: {
      ...mapGetters(['getArenaList', 'className', 'arenaFee', 'cardPackCost']),
      chartData () {
        let labels = []
        let dataset = {
          label: 'Gold prize',
          fill: true,
          backgroundColor: 'rgba(234, 198, 18, 0.3)',
          borderColor: 'rgba(234, 198, 18, 1)',
          data: []
        }
        let datasetCardPack = {
          label: 'Refund with card pack',
          fill: false,
          backgroundColor: '#7A4325',
          borderColor: '#7A4325',
          data: []
        }
        let datasetFee = {
          label: 'Arena refund',
          fill: false,
          backgroundColor: '#9049B3',
          borderColor: '#9049B3',
          data: []
        }

        const history = this.getArenaList()
        for (let i = 0; i < history.length; i++) {
          if (typeof history[i]['prizes'] === 'undefined') continue
          labels.push(i + ' - ' + this.className(history[i]['hsClass']))
          dataset.data.push(history[i]['prizes']['gold'])
          datasetCardPack.data.push(this.arenaFee - this.cardPackCost)
          datasetFee.data.push(this.arenaFee)
        }

        return { labels: labels, datasets: [dataset, datasetCardPack, datasetFee] }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  })
</script>
