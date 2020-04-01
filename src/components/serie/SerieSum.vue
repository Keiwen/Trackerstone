<template>
    <div class="container-fluid">
        <div class="gamemodeSum serieSum row">
            <div class="col-xs-4">
                <rank></rank>
            </div>
            <div class="col-xs-4">
                <milestone></milestone>
            </div>
            <div class="col-xs-4">
                <chest-home></chest-home>
            </div>
        </div>
    </div>
</template>


<script>
  import TsProgressCircle from '@/components/charts/TSProgressCircle'
  import ChestHome from './ChestHome'
  import Rank from './Rank'
  import Milestone from './Milestone'

  export default {
    components: {TsProgressCircle, ChestHome, Rank, Milestone}
  }
</script>

<style lang="scss" scoped>

.gamemodeSum  {

    .col-xs-4 {
      padding-right: 0;
      padding-left: 0;
    }

}


</style>
