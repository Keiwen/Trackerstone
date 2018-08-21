<template>
    <div class="container-fluid">

        <h3>Serie data</h3>
        <serie-set></serie-set>
        <hr/>

        <h3>My heroes</h3>
        <p><i>
            On hero page, you can pick your hero for each class.
        </i></p>
        <router-link :to="{ name: 'myHeroes' }" class="btn btn-info">
            Pick heroes
        </router-link>

        <hr/>

        <h3>Deck types update</h3>
        <p><i>
            On update page, you can check recently added deck types and
            choose to add them or not in your stored list.
            You'll need a connexion to load a remote file.
        </i></p>
        <router-link :to="{ name: 'dtus' }" class="btn btn-info">
            Check deck types updates
        </router-link>

        <hr/>

        <h3>History data</h3>
        <history-set></history-set>
        <hr/>

        <confirmation-modal
                @modal-confirm="hardReset()"
                modalText="You will loose all your data. Are you sure to continue?"
                buttonText="Reset to default data" iconName=""
        />
    </div>
</template>


<script>
  import SerieSet from './SerieSet'
  import HistorySet from './HistorySet'
  import ConfirmationModal from '@/components/modals/ConfirmationModal'

  export default {
    components: {SerieSet, HistorySet, ConfirmationModal},
    methods: {
      hardReset () {
        this.$store.dispatch('resetState')
      }
    }
  }
</script>
