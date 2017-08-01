<template>
    <div class="container-fluid">
        <div class="chart">
            <h2>Ranks</h2>
            <serie-rank-evol-graph :history="history" :height="100" />
        </div>
        <div class="chart">
            <h2>Total stars</h2>
            <serie-stars-evol-graph :history="history" :height="100" />
        </div>

    </div>
</template>


<script>

  import SerieStarsEvolGraph from '@/components/charts/SerieStarsEvolGraph'
  import SerieRankEvolGraph from '@/components/charts/SerieRankEvolGraph'

  export default {
    components: {SerieStarsEvolGraph, SerieRankEvolGraph},
    computed: {
      history () {
        return this.$store.getters.getGamesList()
      }
    }
  }

</script>
