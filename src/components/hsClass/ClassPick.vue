<template>
    <span>
        <button class="btn btn-default btn-class" :class="btnClass" @click="openClassSpread()">{{ btnText }}</button>

        <sweet-modal ref="modalClassPick" overlay-theme="dark" title="Pick class">
            <class-spread @pick-class="classPicked" />
        </sweet-modal>
    </span>

</template>


<script>

  import { SweetModal } from 'sweet-modal-vue'
  import ClassSpread from './ClassSpread'

  export default {
    components: { SweetModal, ClassSpread },
    data () {
      return {
        pick: ''
      }
    },
    computed: {
      btnText () {
        if (this.pick) return this.getClassName(this.pick)
        return 'Choose class...'
      },
      btnClass () {
        if (this.pick) return 'btn-pick ' + (this.pick)
        return ''
      }
    },
    methods: {
      getClassName (id) {
        return this.$store.getters.className(id)
      },
      openClassSpread () {
        this.$refs.modalClassPick.open()
      },
      classPicked (key) {
        this.pick = key
        this.$refs.modalClassPick.close()
        this.$emit('pick-class', key)
      }
    }
  }

</script>

<style lang="scss">
@import '../../assets/scss/_import.scss'

</style>
