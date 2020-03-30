<template>
    <div class="container-fluid">
        <h2>My Heroes</h2>

        <div class="row myHeroes">
            <div class="row" v-for="(hsClass, key) in classes" v-if="key">
                <div class="col-xs-4 col-md-2">
                    <class-card :hsClass="hsClass" />
                </div>
                <div class="col-xs-7 col-md-9 col-xs-offset-1 col-md-offset-1 myHeroesPicker">
                    <enhanced-check-radio :label="getHeroesDisplayForClass(key)"
                                          :value="heroesForClass(key)"
                                          :name="key + '_hero_pick'"
                                          v-model="heroPick[key]"
                                          @input="chooseHeroForClass(key)"
                                          subClass="default" :animate="true" :inline="true" :rounded="true">
                    </enhanced-check-radio>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import { EnhancedCheckRadio } from 'vue-enhanced-check'
  import ClassCard from '../hsClass/ClassCard'

  export default {
    components: {ClassCard, EnhancedCheckRadio},
    data () {
      return {
        heroPick: {}
      }
    },
    computed: {
      ...mapGetters(['classes', 'className', 'myHeroes', 'heroesForClass'])
    },
    mounted () {
      this.heroPick = JSON.parse(JSON.stringify(this.myHeroes))
    },
    methods: {
      ...mapActions(['chooseHero']),
      getHeroesDisplayForClass (classKey) {
        let heroes = JSON.parse(JSON.stringify(this.heroesForClass(classKey)))
        for (let i = 0; i < heroes.length; i++) {
          if (heroes[i] === 'guldan') heroes[i] = 'gul\'dan'
          heroes[i] = heroes[i].charAt(0).toUpperCase() + heroes[i].slice(1)
        }
        return heroes
      },
      chooseHeroForClass (hsClass) {
        this.chooseHero({
          hsClass: hsClass,
          hero: this.heroPick[hsClass]
        })
      }
    }
  }
</script>


<style scoped>
    .myHeroesPicker {
        text-align: left;
    }
</style>
