<template>
    <div class="container">
        <h2>Serie</h2>
        <p>Rank: {{ rank }} - {{ rankTitle }} // Stars: {{ stars }} (Chest: {{ highest }})</p>
        <p>Next milestone: {{ nextMilestone}} - {{ milestoneTitle }} ({{ winsToMilestone }} wins needed)</p>
        <hr/>
        <div>
            <h3>Current deck</h3>
            <deck-pick></deck-pick>
            <br/>
            <router-link :to="{ name: 'deckList' }">Manage decks</router-link>
        </div>
        <br/>
        <button @click="win()">Win</button>
        <button @click="loose()">Loss</button>
        <br/><br/>
        <p>{{ gamesWon }} won / {{ gamesPlayed }} played ({{ winPercent }} % winrate)</p>
        <hr/>
        <button @click="reset()">Reset</button>
    </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import DeckPick from '@/components/DeckPick'

  export default {
    components: {DeckPick},
    computed: {
      ...mapGetters(['rank', 'stars', 'highest', 'nextMilestone', 'winsToMilestone', 'gamesPlayed', 'gamesWon', 'winRate']),
      rankTitle () {
        return this.$store.getters.rankTitle()
      },
      winPercent () {
        return parseInt(this.winRate * 100)
      },
      milestoneTitle () {
        return this.$store.getters.rankTitle(this.nextMilestone)
      }
    },
    methods: {
      ...mapActions(['win', 'loose', 'reset'])
    }
  }

</script>
