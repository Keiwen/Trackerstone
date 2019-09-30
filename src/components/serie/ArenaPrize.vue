<template>
    <div class="arenaPrize container" v-if="hasArenaCompleted">
        <div class="goldPrize col-xs-6 form-group">
            <label for="arena_earn_gold">Gold earned:</label>
            <input type="number" :disabled="!hasLastArenaUnprized"
                   v-model="newGoldPrize" class="form-control" id="arena_earn_gold" />
        </div>
        <div class="dustPrize col-xs-6 form-group">
            <label for="arena_earn_dust">Dust earned:</label>
            <input type="number" :disabled="!hasLastArenaUnprized"
                   v-model="newDustPrize" class="form-control" id="arena_earn_dust" />
        </div>
        <div v-if="hasLastArenaUnprized" class="arenaSavePrize col-xs-12">
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
      ...mapActions(['setLastArenaPrize']),
      storeArenaPrize () {
        this.setLastArenaPrize({gold: this.newGoldPrize, dust: this.newDustPrize})
      }
    },
    mounted () {
      if (this.hasArenaCompleted && !this.hasLastArenaUnprized) {
        const lastArena = this.getArenaList()[this.getArenaList().length - 1]
        this.newGoldPrize = lastArena.prizes.gold
        this.newDustPrize = lastArena.prizes.dust
      }
    }
  }
</script>

<style lang="scss">
    .arenaPrize .form-group.col-xs-4 {
        padding-right: 0;
        padding-left: 0;
        .col-xs-6 {
            padding-right: 0;
            padding-left: 0;
        }
    }
</style>
