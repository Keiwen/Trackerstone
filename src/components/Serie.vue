<template>
    <div class="container">
        <h2>Serie</h2>
        <p>Rank: {{ rank }} - {{ rankTitle }} // Stars: {{ stars }} (Chest: {{ highest }})</p>
        <button @click="win()">Win</button>
        <button @click="loose()">Loss</button>
        <hr/>
        <button @click="reset()">Reset</button>
    </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['rank', 'stars', 'highest']),
      rankTitle () {
        return this.$store.getters.rankTitle()
      }
    },
    methods: {
      ...mapActions(['win', 'loose', 'reset'])
    }
  }

</script>
