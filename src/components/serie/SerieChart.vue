<template>
    <div class="container">

        <flickity ref="serieCharts" :options="{'wrapAround': true}" class="tsCarousel tsCharts">
            <div class="carousel-cell chart">
                <h3>Ranks</h3>
                <serie-rank-evol-graph :height="180" />
            </div>
            <div class="carousel-cell chart">
                <h3>Total stars</h3>
                <serie-stars-evol-graph :height="180" />
            </div>
            <div class="carousel-cell chart">
                <h3>Class played against</h3>
                <class-against-graph :height="180" />
            </div>
            <div class="carousel-cell chart">
                <h3>Archetype played against</h3>
                <archetype-against-graph :height="180" />
            </div>
            <div class="carousel-cell chart">
                <h3>Win percent by hour</h3>
                <win-percent-by-hour-graph :height="160" />
                <i>Point radius represents number of games</i>
            </div>
        </flickity>

    </div>
</template>


<script>
  import Flickity from 'vue-flickity'
  import SerieStarsEvolGraph from '@/components/charts/SerieStarsEvolGraph'
  import SerieRankEvolGraph from '@/components/charts/SerieRankEvolGraph'
  import ClassAgainstGraph from '@/components/charts/ClassAgainstGraph'
  import ArchetypeAgainstGraph from '@/components/charts/ArchetypeAgainstGraph'
  import WinPercentByHourGraph from '@/components/charts/WinPercentByHourGraph'

  export default {
    components: {Flickity, SerieStarsEvolGraph, SerieRankEvolGraph, ClassAgainstGraph, ArchetypeAgainstGraph, WinPercentByHourGraph}
  }
</script>
