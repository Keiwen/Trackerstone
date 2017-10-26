<template>
    <div class="container-fluid">
        <h2>Set serie data</h2>
        <label>Rank: </label><input type="number" v-model="newRank"/>
        <label>Stars: </label><input type="number" v-model="newStars"/>
        <label>Win streak: </label><input type="number" v-model="newWinStreak"/>
        <label>Rank wild: </label><input type="number" v-model="newRankWild"/>
        <label>Stars wild: </label><input type="number" v-model="newStarsWild"/>
        <label>Win streak wild: </label><input type="number" v-model="newWinStreakWild"/>
        <label>Chest: </label><input type="number" v-model="newHighest"/>
        <br/>
        <button @click="set()" class="btn btn-success btn-setting">Ok</button>
    </div>
</template>


<script>

  import * as storeMut from '@/store/mutation-types'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        newRank: 25,
        newStars: 0,
        newWinStreak: 0,
        newRankWild: 25,
        newStarsWild: 0,
        newWinStreakWild: 0,
        newHighest: 25
      }
    },
    computed: {
      ...mapGetters(['rank', 'stars', 'highest', 'winStreak', 'rankWild', 'starsWild', 'winStreakWild', 'highest'])
    },
    methods: {
      ...mapActions(['addSuccess']),
      set () {
        const dataSet = {
          rank: this.newRank,
          stars: this.newStars,
          winStreak: this.newWinStreak,
          rankWild: this.newRankWild,
          starsWild: this.newStarsWild,
          winStreakWild: this.newWinStreakWild,
          highest: this.newHighest
        }
        this.$store.commit(storeMut.SET_SERIE_DATA, dataSet)
        this.addSuccess('Serie data set')
        this.redirectToSerie()
      },
      redirectToSerie () {
        this.$router.push({ name: 'serie' })
      }
    },
    mounted: function () {
      this.newRank = this.rank
      this.newStars = this.stars
      this.newWinStreak = this.winStreak
      this.newRankWild = this.rankWild
      this.newStarsWild = this.starsWild
      this.newWinStreakWild = this.winStreakWild
      this.newHighest = this.highest
    }
  }

</script>

<style>
    .btn-setting {
        margin-top: 20px;
    }

</style>
