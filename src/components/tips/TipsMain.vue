<template>
    <div class="container">

        <flickity ref="tsTips" :options="{'wrapAround': true}" class="tsCarousel tsTips">
            <div class="carousel-cell tip">
                <h3>Starting hand card probability</h3>
                <tip-card-probability></tip-card-probability>
            </div>
            <div class="carousel-cell tip">
                <h3>Percentage of arena runs reaching wins</h3>
                <tip-arena-run-percentage></tip-arena-run-percentage>
            </div>
            <div class="carousel-cell tip">
                <h3>Arena rewards</h3>
                <tip-arena-reward></tip-arena-reward>
            </div>
        </flickity>

    </div>
</template>


<script>
  import Flickity from 'vue-flickity'
  import TipCardProbability from '@/components/tips/TipCardProbability'
  import TipArenaRunPercentage from '@/components/tips/TipArenaRunPercentage'
  import TipArenaReward from '@/components/tips/TipArenaReward'

  export default {
    components: {Flickity, TipCardProbability, TipArenaRunPercentage, TipArenaReward}
  }
</script>
