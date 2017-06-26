<template>
    <div>
        <line-chart :chart-data="chartData" :height="100" />
    </div>
</template>

<script>

  import LineChart from './LineChart'
  import { mapGetters } from 'vuex'

  export default {
    props: ['history'],
    components: {LineChart},
    computed: {
      ...mapGetters(['rank']),
      chartData () {
        let labels = []
        let dataset = {
          label: 'Rank',
          backgroundColor: '#f87979',
          data: []
        }

        for (let i = 0; i < this.history.length; i++) {
          labels.push(i)
          dataset.data.push(this.history[i].rank)
        }
        labels.push('current')
        dataset.data.push(this.rank)

        return { labels: labels, datasets: [dataset] }
      }
    }
  }

</script>
