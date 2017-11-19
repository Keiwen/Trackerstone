<template>
    <div class="container">

        <flickity ref="arenaCharts" :options="{'wrapAround': true}" class="tsCharts">
            <div class="carousel-cell chart">
                <h3>Class played against</h3>
                <class-against-arena-graph :height="180" />
            </div>
            <div class="carousel-cell chart">
                <h3>Gold prize evolution</h3>
                <arena-gold-evol-graph :height="180" />
            </div>
            <div class="carousel-cell chart">
                <h3>Average win by arena completed</h3>
                <arena-classes-graph :height="180" />
            </div>
            <div class="carousel-cell chart">
                <h3>Win in completed arena</h3>
                <arena-won-evol-graph :height="180" />
            </div>
        </flickity>

    </div>
</template>


<script>
  import Flickity from 'vue-flickity'
  import ClassAgainstArenaGraph from '@/components/charts/ClassAgainstArenaGraph'
  import ArenaWonEvolGraph from '@/components/charts/ArenaWonEvolGraph'
  import ArenaGoldEvolGraph from '@/components/charts/ArenaGoldEvolGraph'
  import ArenaClassesGraph from '@/components/charts/ArenaClassesGraph'

  export default {
    components: {Flickity, ClassAgainstArenaGraph, ArenaWonEvolGraph, ArenaGoldEvolGraph, ArenaClassesGraph}
  }
</script>
