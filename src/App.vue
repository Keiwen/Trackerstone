<template>
    <div id="app">
        <topbar v-if="showTopbar"></topbar>
        <router-view></router-view>

        <button @click="routerBack()" class="btn btn-info routerBack" v-if="isChartRoute">
            <icon name="step-backward" />
            Back
        </button>

        <cookie-law theme="dark-lime"
                    v-for="(otm, key) in oneTimeMessages"
                    :key="key"
                    :storageName="'tsotm:'+key"
                    :message="otm">
        </cookie-law>
        <!-- <footer>
          <p>
            <a href="https://github.com/Keiwen/Trackerstone" target="_blank">Trackerstone</a><span> - Version 1.0</span> <span> - Conception Keiwen & Gverrier</span>
          </p>
        </footer> -->
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
      ...mapGetters(['messageBag', 'oneTimeMessages']),
      showTopbar () {
        if (this.isChartRoute || this.isDeckEditionRoute) return false
        return true
      },
      isChartRoute () {
        if (this.$route.meta && this.$route.meta.chartRoute) return true
        return false
      },
      isDeckEditionRoute () {
        if (this.$route.meta && this.$route.meta.deckEditionRoute) return true
        return false
      }
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
      ...mapActions(['nextMessage']),
      routerBack () {
        if (this.$route.meta && this.$route.meta.backRoute) {
          this.$router.push({name: this.$route.meta.backRoute})
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style lang="scss">
    @import './assets/scss/_import.scss';
</style>
