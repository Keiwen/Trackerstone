<template>
    <div class="deckShow" :class="showDivClass" :style="scssVar">
        <div class="row">
            <div class="col-xs-3">
                <div class="profil"></div>
            </div>

            <div class="col-xs-9">
                <div class="row">
                    <div class="col-xs-12">
                        <h4>
                            {{ generateDeckTitleLimit(deck) }}
                        </h4>
                    </div>
                </div>
                <div class="col-xs-12 deckStats">
                    <div class="row">
                        <div class="col-xs-12">
                            <p>
                                {{ deck.wonWith }} - {{ deck.lossWith }}<br/>
                            </p>
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
    props: ['idDeck'],
    data () {
      return {}
    },
    computed: {
      ...mapGetters(['generateDeckTitleLimit', 'lastDeckChanged', 'myHeroForClass', 'useRepresentativeCard', 'deckStats']),
      deck () {
        return this.deckStats[this.idDeck]
      },
      showDivClass () {
        let divClass = 'deckHero-' + this.myHeroForClass(this.deck.type.hsClass)
        divClass += ' deckSerie-' + this.deck.serie
        if (this.lastDeckChanged === this.deck.id) {
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
          '--sampleCard': 'url(https://art.hearthstonejson.com/v1/tiles/' + this.deck.representCard + '.png)'
        }
      },
      hasRepresentCard () {
        if (!this.useRepresentativeCard) return false
        return this.deck.representCard !== undefined && this.deck.representCard !== ''
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/mixins.scss';

    .deckShow {
        height: 60px;
        background-color: var(--second-bg);
        border-radius: 50px 0 0 50px;

        &.lastChange {
            border: 1px solid var(--orange-ts);
        }

        h4 {
            font-family: 'Changa One', cursive;
            text-transform: uppercase;
            text-align: left;
            margin-top: 5px;
            margin-bottom: 5px;
        }

        .profil {
            width: 150px;
            height: 150px;
            display: inline-block;
            position: absolute;
            left: -63%;
            top: -45px;
            transform: scale(0.4);
            background: url('../../assets/heroskin_sprite.png') 0 0 no-repeat;
            background-position: -75px -975px;
        }

        .deckStats {
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

        &.deckSerie {
            &-standard {
                @include boxShadowDeckSerie(var(--serie-standard));
            }

            &-wild {
                @include boxShadowDeckSerie(var(--serie-wild));
            }
        }

    }
    .deckHero {
        &-rexxar .profil {
            background-position: -75px -75px;
        }
        &-guldan .profil {
            background-position: -375px -75px;
        }
        &-thrall .profil {
            background-position: -675px -75px;
        }
        &-jaina .profil {
            background-position: -75px -375px;
        }
        &-malfurion .profil {
            background-position: -375px -376px;
        }
        &-uther .profil {
            background-position: -675px -375px;
        }
        &-anduin .profil {
            background-position: -75px -675px;
        }
        &-garrosh .profil {
            background-position: -375px -675px;
        }
        &-valeera .profil {
            background-position: -675px -675px;
        }
        &-alleria .profil {
            background-position: -675px -975px;
        }
        &-khagdar .profil {
            background-position: -75px -1275px;
        }
        &-medivh .profil {
            background-position: -375px -1275px;
        }
        &-liadrin .profil {
            background-position: -675px -1275px;
        }
        &-arthas .profil {
            background-position: -75px -1575px;
        }
        &-tyrande .profil {
            background-position: -375px -1575px;
        }
        &-maeiv .profil {
            background-position: -675px -1575px;
        }
        &-morgl .profil {
            background-position: -75px -1875px;
        }
        &-nemsy .profil {
            background-position: -375px -1875px;
        }
        &-magni .profil {
            background-position: -675px -1875px;
        }
        &-lunara .profil {
            background-position: -75px -2175px;
        }
        &-jaraxxus .profil {
            background-position: -375px -2175px;
        }
        &-annoy-o .profil {
            background-position: -675px -2175px;
        }
        &-rastakhan .profil {
            background-position: -75px -2475px;
        }
        &-lazul .profil {
            background-position: -375px -2475px;
        }
        &-thunder .profil {
            background-position: -675px -2475px;
        }
        &-elise .profil {
            background-position: -75px -2775px;
        }
        &-deathwing .profil {
            background-position: -375px -2775px;
        }
        &-sylvanas .profil {
            background-position: -675px -2775px;
        }
        &-hazelbark .profil {
            background-position: -75px -3075px;
        }
        &-vashj .profil {
            background-position: -375px -3075px;
        }
        &-illidan .profil {
            background-position: -675px -3075px;
        }
        &-lichking .profil {
          background-position: -75px -3375px;
        }
        &-demonbane .profil {
          background-position: -375px -3375px;
        }
        &-cenarion .profil {
          background-position: -675px -3375px;
        }
        &-giantstalker .profil {
          background-position: -75px -3675px;
        }
        &-arcanist .profil {
          background-position: -375px -3675px;
        }
        &-lawbringer .profil {
          background-position: -675px -3675px;
        }
        &-prophecy .profil {
          background-position: -75px -3975px;
        }
        &-nightslayer .profil {
          background-position: -375px -3975px;
        }
        &-earthfury .profil {
          background-position: -675px -3975px;
        }
        &-felheart .profil {
          background-position: -75px -4275px;
        }
        &-might .profil {
          background-position: -375px -4275px;
        }
        &-edwin .profil {
          background-position: -675px -4275px;
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
            right: 3px;
            background-position: right;
            background-repeat: no-repeat;
            background-clip: padding-box;
            margin-right: 10px;
            opacity: 0.5;
            background-image: var(--sampleCard)
        }
    }

    #newRCard {
        color: black;
        .sweet-action-close {
            color: black;
        }
    }

</style>
