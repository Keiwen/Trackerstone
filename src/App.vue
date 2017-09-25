<template>
    <div id="app">
        <div>
            <router-link :to="{ name: 'serie' }">Track serie</router-link>
            -
            <router-link :to="{ name: 'deckTypesList' }">Manage deck types</router-link>
            -
            <router-link :to="{ name: 'deckList' }">Manage decks</router-link>
            -
            <router-link :to="{ name: 'arena' }">Arena</router-link>
            -
            <router-link :to="{ name: 'settings' }">Settings</router-link>
        </div>
        <img src="./assets/logo.png" style="height: 150px">
        <router-view></router-view>
        <cookie-law theme="dark-lime" message="This website uses local navigator storage to save and load data."></cookie-law>
    </div>
</template>

<script>
  import CookieLaw from 'vue-cookie-law'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'app',
    components: { CookieLaw },
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
