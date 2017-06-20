<template>
    <div class="container">
        <serie-sum/>
        <hr/>
        <duel/>
        <serie-stats/>
        <hr/>
        <button @click="reset()" class="btn btn-danger">Reset</button>
    </div>
</template>


<script>
  import { mapActions } from 'vuex'
  import DeckPick from '@/components/DeckPick'
  import TypePick from '@/components/TypePick'
  import WinLoss from '@/components/WinLoss'
  import SerieSum from '@/components/SerieSum'
  import Duel from '@/components/Duel'
  import SerieStats from '@/components/SerieStats'

  export default {
    components: {DeckPick, TypePick, WinLoss, SerieSum, Duel, SerieStats},
    methods: {
      ...mapActions(['reset'])
    }
  }

</script>
