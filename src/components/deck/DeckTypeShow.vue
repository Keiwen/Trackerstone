<template>
    <div class="deckTypeShow">
        <div class="row">
            <div class="col-xs-10">
                <h4>
                    {{ getClassName(type.hsClass) }} {{ type.name }} ({{ type.archetype }})
                </h4>
            </div>
            <div class="starIcon col-xs-2" @click="switchTop()" @mouseover="hoverStarIcon()" @mouseout="hoverStarIcon()" >
                <icon name="star" v-if="type.top" class="stared" :scale="starIconScale" />
                <icon name="star-o" v-else :scale="starIconScale" />
            </div>
        </div>
        <p>
            Won {{ getGamesWonVsCount() }} / {{ getGamesPlayedVsCount() }} against
            <i>
                ({{ getWinPercentVs() }} % global, {{ getWinPercentVs(true) }} % last {{ getGamesPlayedVsCount(true) }} games)
                 - score {{ getWinScoreVs() }}
            </i>
        </p>
    </div>
</template>


<script>

  import * as storeMut from '@/store/mutation-types'

  export default {
    props: ['type'],
    data () {
      return {
        starIconHover: false
      }
    },
    computed: {
      starIconScale () {
        return (this.starIconHover) ? 2 : 1
      }
    },
    methods: {
      getClassName (id) {
        return this.$store.getters.className(id)
      },
      getGamesPlayedVsCount (recent) {
        return this.$store.getters.getGamesVsType(this.type.id, recent).length
      },
      getGamesWonVsCount (recent) {
        return this.$store.getters.getGamesWonVsType(this.type.id, recent).length
      },
      getWinPercentVs (recent) {
        return this.$store.getters.getWinPercentVsType(this.type.id, recent)
      },
      getWinScoreVs (recent) {
        return this.$store.getters.getWinScoreVsType(this.type.id, recent)
      },
      hoverStarIcon () {
        this.starIconHover = !this.starIconHover
      },
      switchTop () {
        this.$store.commit(storeMut.SWITCH_DECKTYPE_TOP, this.type.id)
      }
    }
  }

</script>

<style lang="scss">
    .deckTypeShow {
        padding-top: 20px;
    }

    .starIcon {
        cursor: pointer;
        padding-bottom: 1em;
        &:hover {
            padding-bottom: 0;
        }
    }

    .stared {
        color: #C6AA37;
    }

</style>
