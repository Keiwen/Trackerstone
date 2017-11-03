<template>
    <div>
        <serie-sum/>
        <button class="btn btn-default btn-wildmode" :class="wildMode ? 'btn-wildSerie' : 'btn-standardSerie'" @click="switchWildMode()">{{ switchWildModeBtnText }}</button>
        <hr/>
        <duel/>
        <serie-stats/>
        <hr/>
        <confirmation-modal
                @modal-confirm="reset()"
                modalText="Are you sure you want to reset serie?"
                buttonText="Reset" iconName=""
        />
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
