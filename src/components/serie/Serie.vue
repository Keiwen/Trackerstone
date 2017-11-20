<template>
    <div class="container-fluid">
        <serie-sum/>
        <hr/>
        <duel/>
        <hr/>
        <serie-stats/>
        <div class="container">
            <div class="col-xs-6">
                <button class="btn btn-default btn-wildmode"
                        :class="wildMode ? 'btn-wildSerie' : 'btn-standardSerie'"
                        @click="switchWildMode()">
                    {{ switchWildModeBtnText }}
                </button>
            </div>
            <div class="col-xs-6">
                <confirmation-modal
                        @modal-confirm="reset()"
                        modalText="Are you sure you want to reset serie? History for current serie will be loss"
                        buttonText="End serie" iconName=""
                />
            </div>
        </div>
    </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import SerieSum from './SerieSum'
  import Duel from './Duel'
  import SerieStats from './SerieStats'
  import ConfirmationModal from '@/components/modals/ConfirmationModal'

  export default {
    components: {SerieSum, Duel, SerieStats, ConfirmationModal},
    computed: {
      ...mapGetters(['wildMode']),
      switchWildModeBtnText () {
        return (this.wildMode) ? 'Wild serie' : 'Standard serie'
      }
    },
    methods: {
      ...mapActions(['reset', 'switchWildMode'])
    }
  }
</script>
