<template>
    <span>
        <button class="btn btn-default" @click="openDeckSpread()">{{ btnText }}</button>

        <sweet-modal ref="modalDeckPick" overlay-theme="dark" title="Pick deck">
            <deck-spread @pick-deck="deckPicked" @goTo="goToManageDeck"></deck-spread>
        </sweet-modal>

    </span>

</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import { SweetModal } from 'sweet-modal-vue'
  import DeckSpread from './DeckSpread'

  export default {
    components: { SweetModal, DeckSpread },
    data () {
      return {
        pick: ''
      }
    },
    computed: {
      ...mapGetters(['own', 'current', 'generateDeckTitleLimit']),
      btnText () {
        if (this.pick) return this.generateDeckTitleLimit(this.own[this.pick])
        return 'Choose deck...'
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
