<template>
    <div class="container">
        <serie-sum/>
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
  import { mapActions } from 'vuex'
  import DeckPick from '@/components/deck/DeckPick'
  import TypePick from '@/components/deck/TypePick'
  import WinLoss from './WinLoss'
  import SerieSum from './SerieSum'
  import Duel from './Duel'
  import SerieStats from './SerieStats'
  import ConfirmationModal from '@/components/modals/ConfirmationModal'

  export default {
    components: {DeckPick, TypePick, WinLoss, SerieSum, Duel, SerieStats, ConfirmationModal},
    methods: {
      ...mapActions(['reset'])
    }
  }

</script>
