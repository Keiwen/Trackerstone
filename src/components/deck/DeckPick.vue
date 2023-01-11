<template>
    <div class="deckPicker">
        <div @click="openDeckSpread()" class="row">
            <div v-if="this.pick > 0" class="col-xs-12">
                <deck-show :id-deck="pick" class="pickContainer"></deck-show>
            </div>
            <button class="btn btn-default" v-else>Choose deck...</button>
        </div>

        <sweet-modal ref="modalDeckPick" overlay-theme="dark" title="Pick deck">
            <deck-spread @pick-deck="deckPicked" @goTo="goToManageDeck"></deck-spread>
        </sweet-modal>
    </div>

</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import { SweetModal } from 'sweet-modal-vue'
  import DeckSpread from './DeckSpread'
  import DeckShow from './DeckShow'

  export default {
    components: { SweetModal, DeckSpread, DeckShow },
    data () {
      return {
        pick: 0
      }
    },
    computed: {
      ...mapGetters(['current'])
    },
    watch: {
      current (newValue) {
        this.pick = newValue.id
      }
    },
    mounted () {
      this.pick = this.current.id
    },
    methods: {
      ...mapActions(['chooseDeck']),
      openDeckSpread () {
        this.$refs.modalDeckPick.open()
      },
      goToManageDeck (routeName) {
        this.$refs.modalDeckPick.close()
        this.$router.push({name: routeName})
      },
      deckPicked (key) {
        this.pick = key
        this.$refs.modalDeckPick.close()
        this.chooseDeck(this.pick)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .deckPicker {
        margin-right: 10px;
    }

</style>
