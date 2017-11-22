<template>
    <div class="container-fluid">
        <serie-set></serie-set>
        <hr/>

        <confirmation-modal
                @modal-confirm="hardReset()"
                modalText="You will loose all your data. Are you sure to continue?"
                buttonText="Reset to default data" iconName=""
        />

    </div>
</template>


<script>
  import SerieSet from '@/components/serie/SerieSet'
  import ConfirmationModal from '@/components/modals/ConfirmationModal'

  export default {
    components: {SerieSet, ConfirmationModal},
    methods: {
      hardReset () {
        this.$store.dispatch('resetState')
      }
    }
  }
</script>
