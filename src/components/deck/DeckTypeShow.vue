<template>
    <div class="deckTypeShow" :class="showDivClass" :style="scssVar">
        <div class="row">
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
                        <div class="col-xs-3 starIcon">
                            <icon name="star" v-if="type.top" class="stared" />
                        </div>
                        <div class="col-xs-9">
                            <p>
                                {{ type.wonVs }} - {{ type.lossVs }} against<br/>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            <div class="col-xs-3">
                <div class="profil">
                </div>
            </div>
        </div>
    </div>
</template>


<script>
  import { mapGetters } from 'vuex'

  export default {
    components: { },
    props: ['idType'],
    data () {
      return {}
    },
    computed: {
      ...mapGetters(['generateTypeTitleLimit', 'lastTypeChanged', 'useRepresentativeCard', 'typesStats']),
      type () {
        return this.typesStats[this.idType]
      },
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


<style lang="scss" scoped>
    @import '../../assets/scss/mixins.scss';

    .deckTypeShow {
        height: 60px;
        background-color: var(--second-bg);
        border-radius: 0 50px 50px 0;

        &.lastChange {
            border: 1px solid var(--orange-ts);
        }

        h4 {
            font-family: 'Changa One', cursive;
            text-transform: uppercase;
            text-align: left;
            margin-top: 5px;
            margin-bottom: 5px;
            margin-left: 20px;
        }

        .profil {
            width: 100px;
            height: 100px;
            display: inline-block;
            position: absolute;
            right: -27px;
            top: -13px;
            transform: scale(0.75);
            background: url('../../assets/icones_classes.png') 0 0 no-repeat;
        }

        .deckTypeStats {
            position: absolute;
            top: 30px;
            left: 0;
        }

        .row {
            margin: 0;

            > div {
                padding: 0;
            }

            .col-xs-2 {
                background-color: var(--black);

                > div {
                    margin: 0 auto;
                    position: relative;
                    width: 30px;
                    height: 58px;
                }
            }
        }

        .stared {
            color: var(--orange-ts)!important;
            height: 22px;
            width: 22px;
            top: 0;
            position: absolute;
            right: 7px;
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

        &-demon_hunter .profil {
            background-position: -280px -400px;
        }

    }

    .deckCardBackground {
        color: var(--black);
        &:before {
            content: "";
            position: absolute;
            width: 85%;
            height: 92%;
            top: 3px;
            left: 15px;
            background-position: right;
            background-repeat: no-repeat;
            background-clip: padding-box;
            margin-right: 10px;
            opacity: 0.5;
            background-image: var(--sampleCard)
        }
    }

    .deckArchetype {
        &-aggro {
            @include boxShadowDeckArchetype(var(--red-ts));
        }

        &-control {
            @include boxShadowDeckArchetype(var(--blue-ts));
        }

        &-midrange {
            @include boxShadowDeckArchetype(var(--green-ts));
        }

        &-combo {
            @include boxShadowDeckArchetype(var(--orange-ts));
        }
    }

</style>
