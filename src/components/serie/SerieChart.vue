<template>
    <div class="container">
        <div class="chart">
            <h2>Ranks</h2>
            <serie-rank-evol-graph :height="100" />
        </div>
        <div class="chart">
            <h2>Total stars</h2>
            <serie-stars-evol-graph :height="100" />
        </div>
        <div class="chart">
            <h2>Class played against</h2>
            <class-against-graph :height="100" />
        </div>
        <div class="chart">
            <h2>Win percent by hour</h2>
            <p>Point size represents number of games</p>
            <win-percent-by-hour-graph :height="100" />
        </div>

    </div>
</template>


<script>
  import SerieStarsEvolGraph from '@/components/charts/SerieStarsEvolGraph'
  import SerieRankEvolGraph from '@/components/charts/SerieRankEvolGraph'
  import ClassAgainstGraph from '@/components/charts/ClassAgainstGraph'
  import WinPercentByHourGraph from '@/components/charts/WinPercentByHourGraph'

  export default {
    components: {SerieStarsEvolGraph, SerieRankEvolGraph, ClassAgainstGraph, WinPercentByHourGraph}
  }
</script>
