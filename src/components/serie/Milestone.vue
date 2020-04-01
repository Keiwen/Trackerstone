<template>
    <div class="milestonehome">
        <h2>Next milestone</h2>
        <div class="col-xs-6 info">
            Stars left
            <ts-progress-circle :completed-steps="starsInMilestone + 1 - starsToMilestone"
                             :total-steps="starsInMilestone + 1"
                             startColor="#321D05"
                             stopColor="#FF911C"
                             :inner-number="starsToMilestone">
            </ts-progress-circle>
        </div>
        <div class="col-xs-6 info">
            Days left
            <ts-progress-circle :completed-steps="getSerieTimeProgress"
                                :total-steps="100"
                                startColor="#1F2F4B"
                                stopColor="#00A8E5"
                                :inner-number="getSerieTimeLeft">
            </ts-progress-circle>
        </div>
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import TsProgressCircle from '@/components/charts/TSProgressCircle'

  export default {
    components: {TsProgressCircle},
    computed: {
      ...mapGetters(['getSerieTimeProgress', 'getSerieTimeLeft', 'starsInMilestone', 'starsToMilestone'])
    }
  }
</script>

<style lang="scss" scoped>

.milestonehome {

  .info {margin-top: 5px}

}


</style>
