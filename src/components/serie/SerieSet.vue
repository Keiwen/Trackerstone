<template>
    <div class="container-fluid">
        <h2>Set serie data</h2>
        <label>Rank: </label><input type="number" v-model="newRank"/>
        <label>Stars: </label><input type="number" v-model="newStars"/>
        <label>Win streak: </label><input type="number" v-model="newWinStreak"/>
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
        newHighest: 25,
        newWinStreak: 0
      }
    },
    computed: {
      ...mapGetters(['rank', 'stars', 'highest', 'winStreak'])
    },
    methods: {
      ...mapActions(['addSuccess']),
      set () {
        const dataSet = {
          rank: this.newRank,
          stars: this.newStars,
          highest: this.newHighest,
          winStreak: this.newWinStreak
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
      this.newHighest = this.highest
      this.newWinStreak = this.winStreak
    }
  }

</script>

<style>
    .btn-setting {
        margin-top: 20px;
    }

</style>
