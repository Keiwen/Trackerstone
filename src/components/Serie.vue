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
  import DeckPick from '@/components/DeckPick'
  import TypePick from '@/components/TypePick'
  import WinLoss from '@/components/WinLoss'
  import SerieSum from '@/components/SerieSum'
  import Duel from '@/components/Duel'
  import SerieStats from '@/components/SerieStats'
  import ConfirmationModal from '@/components/modals/ConfirmationModal'

  export default {
    components: {DeckPick, TypePick, WinLoss, SerieSum, Duel, SerieStats, ConfirmationModal},
    methods: {
      ...mapActions(['reset'])
    }
  }

</script>
