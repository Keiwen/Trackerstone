<template>
    <div class="container">

        <flickity ref="arenaCharts" :options="{'wrapAround': true}" class="tsHints">
            <div class="carousel-cell hint">
                <h3>Starting hand card probability</h3>
                <hint-card-probability></hint-card-probability>
            </div>
            <div class="carousel-cell hint">
                <h3>Percentage of arena runs reaching wins</h3>
                <hint-arena-run-percentage></hint-arena-run-percentage>
            </div>
        </flickity>

    </div>
</template>


<script>
  import Flickity from 'vue-flickity'
  import HintCardProbability from '@/components/hint/HintCardProbability'
  import HintArenaRunPercentage from '@/components/hint/HintArenaRunPercentage'

  export default {
    components: {Flickity, HintCardProbability, HintArenaRunPercentage}
  }
</script>
