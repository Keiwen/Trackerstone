<template>
    <span>
        <button class="btn btn-default btn-class" :class="btnClass" @click="openClassSpread()" :disabled="disabled">{{ btnText }}</button>
        <sweet-modal ref="modalClassPick" overlay-theme="dark" title="Pick class">
            <class-spread @pick-class="classPicked" :allowNone="allowNone" :allowNeutral="allowNeutral" />
        </sweet-modal>
    </span>

</template>


<script>
  import { mapGetters } from 'vuex'
  import { SweetModal } from 'sweet-modal-vue'
  import ClassSpread from './ClassSpread'

  export default {
    components: { SweetModal, ClassSpread },
    props: {
      initialPick: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      allowNone: {
        type: Boolean,
        default: false
      },
      allowNeutral: {
        type: Boolean,
        default: false
      }
    },
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
    mounted () {
      if (typeof this.initialPick !== 'undefined') this.pick = this.initialPick
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/mixins.scss';

    .btn-class.btn-pick {
        position: relative;
        margin-left: 60px;

        &:active:focus {
            outline: none;
        }

        &:focus {
            outline: none;
        }

        &::before {
            content: '';
            position: absolute;
            display: block;
            width: 80px;
            height: 80px;
            @include transition(0.5s);
            @include transform(scale(0.65));
            border-radius: 50%;
            left: -74px;
            top: -25px;
            background: url('../../assets/icones_classes.png') 0 0 no-repeat;
        }

        &.neutral::before {
          background-position: -40px -520px;
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

        &.demon_hunter::before {
            background-position: -280px -400px;
        }

        &.death_knight::before {
          background-position: -160px -400px;
        }

    }
</style>
