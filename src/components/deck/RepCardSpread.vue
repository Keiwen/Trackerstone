<template>
    <div class="container-fluid">
        <div class="row repCardFilter">
            <div class="form-group">
                <label for="repCardFilter" class="control-label col-xs-3">Search for:</label>
                <div class="col-xs-9">
                    <input type="text" class="form-control" id="repCardFilter" v-model="repCardFilter">
                </div>
            </div>
        </div>
        <hr/>

        <div class="rep-card-spread">
            <div class="col-xs-4" v-for="(rcName, rcId) in repCardsFiltered">
                <div class="repCard" @click="pickRepCard(rcId)">
                    {{ rcName }}
                </div>
            </div>
        </div>
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        repCardFilter: ''
      }
    },
    computed: {
      ...mapGetters(['repCards']),
      repCardsFiltered () {
        let filteredList = JSON.parse(JSON.stringify(this.repCards))
        if (this.repCardFilter.length < 3) return filteredList
        for (let repCardId of Object.keys(filteredList)) {
          if (!filteredList.hasOwnProperty(repCardId)) continue
          if (filteredList[repCardId].toLowerCase().indexOf(this.repCardFilter.toLowerCase()) === -1) {
            delete filteredList[repCardId]
          }
        }
        return filteredList
      }
    },
    methods: {
      pickRepCard (key) {
        this.$emit('pick-rep-card', key)
      }
    }
  }
</script>


<style lang="scss" scoped>
    .repCardFilter {
        padding-top: 10px;
        padding-bottom: 15px;
    }

    .repCard {
        margin-bottom: 10px;
        border: 1px solid black;
        padding: 3px;
        height: 50px;

        .repCardId {
            font-style: italic;
        }
    }
</style>
