<template>
    <div class="container">
        <div class="chart">
            <h2>Ranks</h2>
            <serie-rank-evol-graph :history="history" :height="100" />
        </div>
        <div class="chart">
            <h2>Total stars</h2>
            <serie-stars-evol-graph :history="history" :height="100" />
        </div>
        <div class="chart">
            <h2>Class played against</h2>
            <class-against-graph :history="history" :height="100" />
        </div>

    </div>
</template>


<script>

  import SerieStarsEvolGraph from '@/components/charts/SerieStarsEvolGraph'
  import SerieRankEvolGraph from '@/components/charts/SerieRankEvolGraph'
  import ClassAgainstGraph from '@/components/charts/ClassAgainstGraph'

  export default {
    components: {SerieStarsEvolGraph, SerieRankEvolGraph, ClassAgainstGraph},
    computed: {
      history () {
        return this.$store.getters.getGamesList()
      }
    }
  }

</script>
