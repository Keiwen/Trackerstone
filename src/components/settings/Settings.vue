<template>
    <div class="container-fluid">

        <h3>Serie data</h3>
        <serie-set></serie-set>
        <hr/>

        <h3>My heroes</h3>
        <p><i>
            On hero page, you can pick your hero for each class.
        </i></p>
        <router-link :to="{ name: 'myHeroes' }" class="btn btn-default">
            Pick heroes
        </router-link>

        <hr/>

        <h3>Deck types update</h3>
        <p><i>
            On update page, you can check recently added deck types and
            choose to add them or not in your stored list.
        </i></p>
        <router-link :to="{ name: 'dtus' }" class="btn btn-default">
            Check deck types updates
        </router-link>

        <hr/>

        <h3>History data</h3>
        <history-set></history-set>
        <hr/>

        <h3>Export / Import</h3>
        <button @click="openExportData()" class="btn btn-info">Export data</button>
        <sweet-modal ref="modalExportData" modal-theme="dark" title="Export data">
            <p>Below are your data in JSON format.<br/>You can copy this text and store it to reload it later.</p>
            <textarea id="exportData" v-model="dataExport" rows="7" cols="70">
            </textarea>

            <button slot="button" class="btn btn-default"
                    v-clipboard:copy="dataExport"
                    v-clipboard:success="onClipboardSuccess"
                    v-tooltip.notrigger.bottom="{ content: 'Copied!', visible: clipboardSuccess }">
                Copy <icon name="clipboard" />
            </button>
            <button slot="button" @click="closeExportData()" class="btn btn-default">Close <icon name="times" /></button>
        </sweet-modal>

        <button @click="openImportData()" class="btn btn-warning">Import data</button>
        <sweet-modal ref="modalImportData" modal-theme="dark" title="Import data">
            <p>There is no control about data validity, be sure about your import.</p>
            <textarea id="importData" v-model="dataToImport" rows="7" cols="70">
            </textarea>

            <button slot="button" @click="closeImportData()" class="btn btn-default">Close <icon name="times" /></button>
            <button slot="button" @click="confirmImportData()" class="btn btn-success">Import <icon name="save" /></button>
        </sweet-modal>


        <hr/>

        <h3>Reset</h3>
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
  import { mapGetters, mapActions } from 'vuex'
  import { SweetModal } from 'sweet-modal-vue'

  export default {
    components: {SerieSet, HistorySet, ConfirmationModal, SweetModal},
    data () {
      return {
        clipboardSuccess: false,
        dataToImport: ''
      }
    },
    computed: {
      ...mapGetters(['dataExport'])
    },
    methods: {
      ...mapActions(['importData', 'addError']),
      hardReset () {
        this.$store.dispatch('resetState')
      },
      openExportData () {
        this.$refs.modalExportData.open()
        this.$ga.event('interface', 'export', 'exportData')
      },
      closeExportData () {
        this.$refs.modalExportData.close()
      },
      onClipboardSuccess () {
        this.clipboardSuccess = true
        setTimeout(this.onClipboardOut, 1000)
      },
      onClipboardOut () {
        this.clipboardSuccess = false
      },
      openImportData () {
        this.$refs.modalImportData.open()
      },
      confirmImportData () {
        const importPromise = this.importData(this.dataToImport)
        const modalImportData = this.$refs.modalImportData
        const router = this.$router
        importPromise.then(
          function (importOk) {
            if (importOk) {
              // import success
              modalImportData.close()
              router.push({name: 'serie'})
              this.$ga.event('interface', 'import', 'importData')
            } else {
              // import fail
            }
          },
          function (importReturn) {
            this.addError('Something went wrong while importing data')
            console.log(importReturn) // console.log on purpose
            this.$ga.event('interface', 'import', 'importDataFail')
          }
        )
      },
      closeImportData () {
        this.$refs.modalImportData.close()
      }
    }
  }
</script>

<style>
    #exportData,#importData {
        color: black;
    }
</style>
