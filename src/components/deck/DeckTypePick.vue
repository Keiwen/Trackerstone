<template>
    <span>
        <button class="btn btn-default" @click="openTypeSpread()">{{ btnText }}</button>

        <sweet-modal ref="modalTypePick" overlay-theme="dark" title="Pick type">
            <deck-type-spread :allowGenericPick="allowGenericPick" @pick-type="typePicked" @goTo="goToManageDeckType"></deck-type-spread>
        </sweet-modal>

    </span>

</template>


<script>
  import { mapGetters } from 'vuex'
  import { SweetModal } from 'sweet-modal-vue'
  import DeckTypeSpread from './DeckTypeSpread'

  export default {
    components: { SweetModal, DeckTypeSpread },
    props: {
      initialPick: {
        type: String
      },
      allowGenericPick: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        pick: {}
      }
    },
    computed: {
      ...mapGetters(['generateTypeTitle']),
      btnText () {
        if (this.pick.id) return this.generateTypeTitle(this.pick)
        return 'Choose type...'
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
        this.pick = key
        this.$refs.modalTypePick.close()
        this.$emit('pick-type', key)
      }
    },
    mounted: function () {
      if (typeof this.initialPick !== 'undefined') this.pick = this.initialPick
    }
  }
</script>
