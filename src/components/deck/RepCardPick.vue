<template>
    <span>
        <button class="btn btn-default btn-class" @click="openRepCardSpread()" :disabled="disabled">{{ btnText }}</button>

        <sweet-modal ref="modalRepCardPick"  title="Pick representative card">
            <rep-card-spread @pick-rep-card="repCardPicked" />
        </sweet-modal>
    </span>

</template>


<script>
  import { mapGetters } from 'vuex'
  import { SweetModal } from 'sweet-modal-vue'
  import RepCardSpread from './RepCardSpread'

  export default {
    components: { SweetModal, RepCardSpread },
    props: {
      initialPick: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        pick: ''
      }
    },
    watch: {
      initialPick (newValue) {
        this.pick = newValue
      }
    },
    computed: {
      ...mapGetters(['repCardName']),
      btnText () {
        return (this.pick) ? this.repCardName(this.pick) : 'Choose card...'
      }
    },
    methods: {
      openRepCardSpread () {
        if (this.disabled) return
        this.pick = this.initialPick
        this.$refs.modalRepCardPick.open()
      },
      repCardPicked (key) {
        this.pick = key
        this.$refs.modalRepCardPick.close()
        this.$emit('pick-rep-card', this.pick)
      }
    }
  }
</script>

<style lang="scss">
</style>
