<template>
    <span>

        <button @click="promptConfirm()" class="btn" :class="btnClass">{{ buttonText }} <icon :name="iconName" /></button>
        <sweet-modal :icon="iconModal" ref="modalConfirmation" hide-close-button :modal-theme="modalTheme">
            {{ modalText }}
            <button slot="button" @click="confirmed()" class="btn btn-success">{{ confirmText }} <icon :name="iconName" /></button>
            <button slot="button" @click="canceled()" class="btn btn-default">{{ cancelText }} <icon name="times" /></button>
        </sweet-modal>
    </span>
</template>


<script>

  import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

  export default {
    components: { SweetModal, SweetModalTab },
    props: {
      buttonText: {
        type: String,
        default: 'Remove'
      },
      modalText: {
        type: String,
        default: 'Are you sure you want to delete?'
      },
      confirmText: {
        type: String,
        default: 'Confirm'
      },
      cancelText: {
        type: String,
        default: 'Cancel'
      },
      iconName: {
        type: String,
        default: 'trash'
      },
      iconModal: {
        type: String,
        default: 'warning'
      },
      btnSubClass: {
        type: String,
        default: 'danger'
      },
      darkTheme: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      btnClass () {
        if (this.btnSubClass === '') return ''
        return 'btn-' + this.btnSubClass
      },
      modalTheme () {
        if (this.darkTheme) return 'dark'
        return 'light'
      }
    },
    methods: {
      promptConfirm () {
        this.$refs.modalConfirmation.open()
//        this.$emit('pick-class', this.pick)
      },
      confirmed () {
        this.$refs.modalConfirmation.close()
        this.$emit('modal-confirm')
      },
      canceled () {
        this.$refs.modalConfirmation.close()
      }
    }
  }

</script>

<style>

    .sweet-buttons button {
        margin-left: 20px;
    }

</style>
