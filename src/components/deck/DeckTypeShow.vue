<template>
    <div class="deckTypeShow" :class="showDivClass" :style="scssVar">
        <div class="row">
            <div class="col-xs-3">
                <div class="profil">
                </div>
            </div>
            <div class="col-xs-9">
                <div class="row">
                    <div class="col-xs-12">
                        <h4>
                            {{ generateTypeTitleLimit(type) }}
                        </h4>
                    </div>
                </div>
                <div class="col-xs-12 deckTypeStats">
                    <div class="row">
                        <!-- <div class="col-xs-1 editIcon">
                            <icon name="pencil-square-o" v-if="type.note" class="noted" />
                        </div> -->
                        <div class="col-xs-9">
                            <p>
                                {{ type.wonVs }} - {{ type.lossVs }} against<br/>
                            </p>
                        </div>
                        <div class="col-xs-3 starIcon">
                            <icon name="star" v-if="type.top" class="stared" />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    components: { },
    props: ['type'],
    data () {
      return {}
    },
    computed: {
      ...mapGetters(['generateTypeTitleLimit', 'lastTypeChanged', 'useRepresentativeCard']),
      showDivClass () {
        let divClass = 'deckClass-' + this.type.hsClass + ' deckArchetype-' + this.type.archetype
        if (this.lastTypeChanged === this.type.id) {
          divClass += ' lastChange'
        }
        if (this.hasRepresentCard) {
          divClass += ' deckCardBackground'
        }
        return divClass
      },
      scssVar () {
        if (!this.hasRepresentCard) {
          return {}
        }
        return {
          '--sampleCard': 'url(https://art.hearthstonejson.com/v1/tiles/' + this.type.representCard + '.png)'
        }
      },
      hasRepresentCard () {
        if (!this.useRepresentativeCard) return false
        return this.type.representCard !== undefined && this.type.representCard !== ''
      }
    }
  }
</script>


<style lang="scss">
    .deckTypeContainer {
        .deckTypeShow {
            .profil {
                background: url('../../assets/icones_classes.png') 0 0 no-repeat;
            }
        }
        .deckClass {
            &-hunter .profil {
                background-position: -40px -40px;
            }

            &-warlock .profil {
                background-position: -160px -40px;
            }

            &-shaman .profil {
                background-position: -280px -40px;
            }

            &-mage .profil {
                background-position: -40px -160px;
            }

            &-druid .profil {
                background-position: -160px -160px;
            }

            &-paladin .profil {
                background-position: -280px -160px;
            }

            &-priest .profil {
                background-position: -40px -280px;
            }

            &-warrior .profil {
                background-position: -160px -280px;
            }

            &-rogue .profil {
                background-position: -280px -280px;
            }

        }
    }

    .deckCardBackground {
        &:before {
            background-image: var(--sampleCard)
        }
    }
</style>
