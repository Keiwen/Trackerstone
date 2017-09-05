<template>
    <div class="container">
        <div class="chart">
            <h2>Class played against</h2>
            <class-against-arena-graph :height="100" />
        </div>
        <div class="chart">
            <h2>Gold prize evolution</h2>
            <arena-gold-evol-graph :height="100" />
        </div>
        <div class="chart">
            <h2>Win in completed arena</h2>
            <arena-won-evol-graph :height="100" />
        </div>

    </div>
</template>


<script>

  import ClassAgainstArenaGraph from '@/components/charts/ClassAgainstArenaGraph'
  import ArenaWonEvolGraph from '@/components/charts/ArenaWonEvolGraph'
  import ArenaGoldEvolGraph from '@/components/charts/ArenaGoldEvolGraph'

  export default {
    components: {ClassAgainstArenaGraph, ArenaWonEvolGraph, ArenaGoldEvolGraph}
  }

</script>
