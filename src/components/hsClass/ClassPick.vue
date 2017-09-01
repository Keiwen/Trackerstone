<template>
    <span>
        <button class="btn btn-default" @click="openClassSpread()">{{ btnText }}</button>

        <sweet-modal ref="modalClassPick" overlay-theme="dark" title="Pick class">
            <class-spread @pick-class="classPicked" />
        </sweet-modal>
    </span>

</template>


<script>

  import { mapGetters } from 'vuex'
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
      ...mapGetters(['className']),
      btnText () {
        if (this.pick) return this.className(this.pick)
        return 'Choose class...'
      }
    },
    methods: {
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
