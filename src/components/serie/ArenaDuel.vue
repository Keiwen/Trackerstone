<template>
    <div class="container-fluid">

        <div class="container">
            <div class="col-xs-6">
                <h3>Current class</h3>
                <class-pick :initialPick="currentArena.id" :disabled="true"/>
            </div>
            <div class="col-xs-6">
                <h3>Opponent class</h3>
                <class-pick @pick-class="pickOpponentClass" :initialPick="opponentArena.id" />
            </div>
        </div>

        <div class="container">
            <p></p>
        </div>

        <div class="duelButtons">
            <button @click="playedArenaDuel(true)" class="btn btn-success">Win <icon name="thumbs-up" /></button>
            <span class="winstreakIcon"></span>
            <button @click="playedArenaDuel(false)" class="btn btn-warning">Loss <icon name="thumbs-down" /></button>
        </div>
    </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import ClassPick from '@/components/hsClass/ClassPick'
  import { SweetModal } from 'sweet-modal-vue'

  export default {
    components: {ClassPick, SweetModal},
    computed: {
      ...mapGetters(['currentArena', 'opponentArena'])
    },
    methods: {
      ...mapActions(['winArena', 'looseArena', 'chooseOpponentArena']),
      pickOpponentClass (hsClass) {
        this.chooseOpponentArena(hsClass)
      },
      playedArenaDuel (won) {
        this.$ga.event('history', 'add', 'arena')
        won ? this.winArena() : this.looseArena()
      }
    }
  }
</script>

<style lang="scss" scoped>
    .duelButtons {
        .btn-success {
            padding-right: 30px;
            position: relative;

            svg {
                position: absolute;
                top: 6px;
                right: 7px;
            }
        }

        .btn-warning {
            padding-right: 30px;
            position: relative;

            svg {
                position: absolute;
                top: 8px;
                right: 7px;
            }
        }
    }

</style>
