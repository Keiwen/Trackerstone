<template>
    <div class="arenaPrize" v-if="hasArenaCompleted">
        <div class="goldPrize col-sm-6">
            Gold earned:
            <input type="number" :disabled="!hasLastArenaUnprized" v-model="newGoldPrize" />
        </div>
        <div class="dustPrize col-sm-6">
            Dust earned:
            <input type="number" :disabled="!hasLastArenaUnprized" v-model="newDustPrize" />
        </div>
        <div v-if="hasLastArenaUnprized">
            <button @click="storeArenaPrize()" class="btn btn-success" :disabled="!newGoldPrize && !newDustPrize">Save arena prizes</button>
        </div>
    </div>
</template>


<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data () {
      return {
        newGoldPrize: '',
        newDustPrize: ''
      }
    },
    computed: {
      ...mapGetters(['getArenaList']),
      hasArenaCompleted () {
        return this.getArenaList().length > 0
      },
      hasLastArenaUnprized () {
        if (!this.hasArenaCompleted) return false
        const arenaCompleted = this.getArenaList()
        const lastArena = arenaCompleted[arenaCompleted.length - 1]
        return (typeof lastArena['prizes'] === 'undefined')
      }
    },
    methods: {
      ...mapActions(['setLastArenaPrize', 'addSuccess']),
      storeArenaPrize () {
        this.setLastArenaPrize({gold: this.newGoldPrize, dust: this.newDustPrize})
        this.addSuccess('Arena prizes saved')
      }
    },
    mounted: function () {
      if (this.hasArenaCompleted && !this.hasLastArenaUnprized) {
        const lastArena = this.getArenaList()[this.getArenaList().length - 1]
        this.newGoldPrize = lastArena.prizes.gold
        this.newDustPrize = lastArena.prizes.dust
      }
    }
  }
</script>
