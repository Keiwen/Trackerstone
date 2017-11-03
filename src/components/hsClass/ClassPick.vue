<template>
    <span>
        <button class="btn btn-default btn-class" :class="btnClass" @click="openClassSpread()" :disabled="disabled">{{ btnText }}</button>
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
    props: ['initialPick', 'disabled'],
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
      },
      btnClass () {
        if (this.pick) return 'btn-pick ' + (this.pick)
        return ''
      }
    },
    methods: {
      openClassSpread () {
        if (this.disabled) return
        this.$refs.modalClassPick.open()
      },
      classPicked (key) {
        this.pick = key
        this.$refs.modalClassPick.close()
        this.$emit('pick-class', key)
      }
    },
    mounted: function () {
      if (typeof this.initialPick !== 'undefined') this.pick = this.initialPick
    }
  }
</script>

<style lang="scss">
    .btn-class.btn-pick {
        &::before {
            background: url('../../assets/icones_classes.png') 0 0 no-repeat;
        }

        &.hunter::before {
            background-position: -40px -40px;
        }

        &.warlock::before {
            background-position: -160px -40px;
        }

        &.shaman::before {
            background-position: -280px -40px;
        }

        &.mage::before {
            background-position: -40px -160px;
        }

        &.druid::before {
            background-position: -160px -160px;
        }

        &.paladin::before {
            background-position: -280px -160px;
        }

        &.priest::before {
            background-position: -40px -280px;
        }

        &.warrior::before {
            background-position: -160px -280px;
        }

        &.rogue::before {
            background-position: -280px -280px;
        }

    }
</style>
