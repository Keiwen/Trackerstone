<template>
    <div class="deckTypePicker">
        <div @click="openTypeSpread()" class="row">
            <div v-if="hasPick" class="col-xs-12">
                <deck-type-show :id-type="pick" class="pickContainer" />
            </div>
            <button class="btn btn-default" v-else>Choose type...</button>
        </div>

        <sweet-modal ref="modalTypePick" overlay-theme="dark" title="Pick type">
            <deck-type-spread :allowGenericPick="allowGenericPick" @pick-type="typePicked" @goTo="goToManageDeckType"></deck-type-spread>
        </sweet-modal>

    </div>

</template>


<script>
  import { mapGetters } from 'vuex'
  import { SweetModal } from 'sweet-modal-vue'
  import DeckTypeSpread from './DeckTypeSpread'
  import DeckTypeShow from './DeckTypeShow'

  export default {
    components: { SweetModal, DeckTypeSpread, DeckTypeShow },
    props: {
      initialPick: {
      },
      allowGenericPick: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        pick: 0
      }
    },
    computed: {
      ...mapGetters(['typesStats']),
      hasPick () {
        return this.pick !== 0
      }
    },
    methods: {
      openTypeSpread () {
        this.$refs.modalTypePick.open()
      },
      goToManageDeckType (routeName) {
        this.$refs.modalTypePick.close()
        this.$router.push({name: routeName})
      },
      typePicked (key) {
        this.pick = key.id
        this.$refs.modalTypePick.close()
        this.$emit('pick-type', key)
      }
    },
    mounted () {
      if (typeof this.initialPick !== 'undefined') {
        this.pick = this.initialPick
      }
    }
  }
</script>


<style lang="scss" scoped>
    .deckTypePicker {
        margin-top: 5px;
        margin-left: 10px;
    }

</style>
