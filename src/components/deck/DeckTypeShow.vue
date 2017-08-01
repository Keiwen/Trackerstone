<template>
    <div class="deckTypeShow">
        <div class="row">
            <div class="col-xs-10">
                <h4>
                    {{ getClassName(type.hsClass) }} {{ type.name }} ({{ type.archetype }})
                </h4>
            </div>
            <div class="starIcon col-xs-2" @click="switchTop()">
                <icon name="star" v-if="type.top" class="stared"/>
                <icon name="star-o" v-else />
            </div>
        </div>
        <p>Won {{ getGamesWonVsCount() }} / {{ getGamesPlayedVsCount() }} against ({{ getWinPercentVs() }} % global, {{ getWinPercentVs(true) }} % last {{ getGamesPlayedVsCount(true) }} games)</p>
    </div>
</template>


<script>

  import * as storeMut from '@/store/mutation-types'

  export default {
    props: ['type'],
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
      switchTop () {
        this.$store.commit(storeMut.SWITCH_DECKTYPE_TOP, this.type.id)
      }
    }
  }

</script>

<style>
    .deckTypeShow {

    }

    .starIcon {
        cursor: pointer;
    }

    .stared {
        color: #C6AA37;
    }

</style>
