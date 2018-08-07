<template>
    <div class="container-fluid">
        <h2>Deck types update</h2>

        <div class="row" v-if="dataLoaded">
            <div v-if="loadedDeckTypes.length == 0">
                You are up to date
            </div>
            <div v-else>

                <div class="col-xs-12">
                    <div class="col-xs-6">
                        <confirmation-modal
                                @modal-confirm="ignoreAll()"
                                modalText="You will ignore all deck types updates. Are you sure to continue?"
                                buttonText="Ignore all" iconName=""
                        />
                    </div>
                    <div class="col-xs-6">
                        <confirmation-modal
                                @modal-confirm="proceedImport()"
                                modalText="Import selected types?"
                                buttonText="Proceed import" iconName=""
                                btnSubClass="success"
                        />
                    </div>
                </div>

                <hr style="width: 100%;"/>

                <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="(newDeckType, index) in loadedDeckTypes">
                    <div class="col-xs-4">{{ generateTypeTitle(newDeckType) }}</div>
                    <div class="col-xs-2">
                        <enhanced-check v-model="newDeckType.top" label="Star" :animate="true" class="starCheck" subClass="warning" />
                    </div>
                    <div class="col-xs-3">
                        <enhanced-toggle labelOn="Add" labelOff="Ignore"
                                         styleOn="success" styleOff="danger"
                                         v-model="newDeckType.toAdd" :rounded="true" >
                        </enhanced-toggle>
                    </div>
                    <div class="col-xs-3">
                        <button class="btn btn-info" type="button" v-tooltip.bottom="{ html: 'tooltipContent'+index }">
                            <span class="badge">{{ getTypesWithClass(newDeckType.hsClass).length }}</span> stored
                        </button>
                        <div :id="'tooltipContent'+index">
                            Current {{ className(newDeckType.hsClass) }} types stored:
                            <ul>
                                <li v-for="existingType in getTypesWithClass(newDeckType.hsClass)">
                                    {{ generateTypeTitle(existingType) }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as storeMut from '@/store/mutation-types'
  import ClassCard from '@/components/hsClass/ClassCard'
  import { EnhancedCheck, EnhancedToggle } from 'vue-enhanced-check'
  import ConfirmationModal from '@/components/modals/ConfirmationModal'

  export default {
    components: {ClassCard, EnhancedCheck, EnhancedToggle, ConfirmationModal},
    data () {
      return {
        loadedDeckTypes: [],
        dataLoaded: false,
        sortBy: 'star',
        topFirst: true
      }
    },
    computed: {
      ...mapGetters(['lastDeckTypeUpdate', 'className', 'generateTypeTitle', 'getTypesWithClass'])
    },
    methods: {
      ...mapActions(['loadDeckTypeUpdate', 'addSuccess']),
      proceedImport () {
        for (let i = 0; i < this.loadedDeckTypes.length; i++) {
          if (this.loadedDeckTypes[i].toAdd) {
            this.$store.commit(storeMut.ADD_DECKTYPE, {
              name: this.loadedDeckTypes[i].name,
              hsClass: this.loadedDeckTypes[i].hsClass,
              archetype: this.loadedDeckTypes[i].archetype,
              top: this.loadedDeckTypes[i].top
            })
          }
        }
        this.addSuccess('Import completed')
        this.loadedDeckTypes = []
        this.updateDtusTime()
      },
      ignoreAll () {
        this.loadedDeckTypes = []
        this.updateDtusTime()
      },
      updateDtusTime () {
        this.$store.commit(storeMut.UPDATE_DTUS_TIME)
      }
    },
    mounted () {
      this.loadDeckTypeUpdate().then(
        (result) => {
          for (let i = 0; i < result.types.length; i++) {
            if (result.types[i].timeAdded > this.lastDeckTypeUpdate) {
              result.types[i].toAdd = true
              this.loadedDeckTypes.push(result.types[i])
            }
          }
          this.dataLoaded = true
        }
      ).catch(() => {})
    }
  }
</script>


<style>
</style>