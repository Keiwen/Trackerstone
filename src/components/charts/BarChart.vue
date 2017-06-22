

<script>

  import { Bar, mixins } from 'vue-chartjs'

  export default Bar.extend({
    mixins: [mixins.reactiveProp],
    props: ['options'],
    mounted () {
      // this.chartData is created in the mixin
      this.renderChart(this.chartData, this.options)
    }
  })

</script>
