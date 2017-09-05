<template>
    <div class="container">
        <div class="chart">
            <h2>Deck types most played against</h2>
            <deck-type-against-graph :height="100" />
        </div>

    </div>
</template>


<script>

  import DeckTypeAgainstGraph from '@/components/charts/DeckTypeAgainstGraph'

  export default {
    components: {DeckTypeAgainstGraph}
  }

</script>
