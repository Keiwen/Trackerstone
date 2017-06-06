<template>
    <div class="container">
        <h2>Set serie data</h2>
        <label>Rank: </label><input type="number" v-model="rank"/>
        <label>Stars: </label><input type="number" v-model="stars"/>
        <label>Win streak: </label><input type="number" v-model="winStreak"/>
        <label>Chest: </label><input type="number" v-model="highest"/>
        <hr/>
        <button @click="set()" class="btn btn-success">Ok</button>
    </div>
</template>


<script>

  import * as storeMut from '../store/mutation-types'

  export default {
    data () {
      return {
        rank: 25,
        stars: 0,
        highest: 25,
        winStreak: 0
      }
    },
    methods: {
      set () {
        const dataSet = {
          rank: this.rank,
          stars: this.stars,
          highest: this.highest,
          winStreak: this.winStreak
        }
        this.$store.commit(storeMut.SET_SERIE_DATA, dataSet)
        this.redirectToSerie()
      },
      redirectToSerie () {
        this.$router.push({ name: 'serie' })
      }
    },
    mounted: function () {
      this.rank = this.$store.getters.rank
      this.stars = this.$store.getters.stars
      this.highest = this.$store.getters.highest
      this.winStreak = this.$store.getters.winStreak
    }
  }

</script>
