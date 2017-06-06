<template>
    <span class="winLoss">{{ letter }}</span>
</template>


<script>

  export default {
    props: ['game'],
    computed: {
      letter () {
        if (this.game.won) return 'W'
        return 'L'
      }
    }
  }

</script>


<style>
    .winLoss {
        margin-left: 1px;
        margin-right: 1px;
        width: 15px;
        display: inline-block;
    }
</style>
