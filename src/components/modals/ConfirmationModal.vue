<template>
    <div>
        <button @click="promptConfirm()" class="btn" :class="btnClass">{{ buttonText }} <icon :name="iconName" v-if="displayIcon" /></button>
        <sweet-modal :icon="iconModal" ref="modalConfirmation" :modal-theme="modalTheme">
            {{ modalText }}
            <button slot="button" @click="confirmed()" class="btn btn-success">{{ confirmText }} <icon :name="iconName" v-if="displayIcon" /></button>
            <button slot="button" @click="canceled()" class="btn btn-default">{{ cancelText }} <icon name="times" v-if="displayIcon" /></button>
        </sweet-modal>
    </div>
</template>


<script>

  import { SweetModal } from 'sweet-modal-vue'

  export default {
    components: { SweetModal },
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
      displayIcon () {
        return this.iconName !== ''
      },
      modalTheme () {
        if (this.darkTheme) return 'dark'
        return 'light'
      }
    },
    methods: {
      promptConfirm () {
        this.$refs.modalConfirmation.open()
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

<style scoped>

    div {
        display: inline-block;
    }

    .sweet-buttons button {
        margin-left: 20px;
    }

</style>
