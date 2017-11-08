<template>
    <div id="app">
        <topbar></topbar>
        <router-view></router-view>
        <cookie-law theme="dark-lime" message="This website uses local navigator storage to save and load data."></cookie-law>
    </div>
</template>

<script>
  import CookieLaw from 'vue-cookie-law'
  import Topbar from '@/components/Topbar/Topbar'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'app',
    components: { CookieLaw, Topbar },
    computed: {
      ...mapGetters(['messageBag'])
    },
    watch: {
      messageBag: function (newValue, oldValue) {
        const messageManager = this.$toast
        this.nextMessage().then(
          function (data) {
            // on success
            if (data.type) {
              switch (data.type) {
                case 'success':
                  messageManager.success(data)
                  break
                case 'warn':
                case 'warning':
                  messageManager.warn(data)
                  break
                case 'error':
                case 'danger':
                  messageManager.error(data)
                  break
                default:
                  messageManager.info(data)
              }
            }
          },
          function (data) {
            // on failure
          }
        )
      }
    },
    methods: {
      ...mapActions(['nextMessage'])
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/scss/_import.scss'
</style>
