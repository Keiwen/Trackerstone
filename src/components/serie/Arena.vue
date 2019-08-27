<template>
    <div>
        <arena-sum/>
        <hr/>
        <div class="arenaOpen" v-if="arenaOpen">
            <arena-duel/>
            <hr/>
            <arena-stats/>
            <hr/>
            <confirmation-modal
                    @modal-confirm="closeArena()"
                    modalText="Are you sure you want to give up arena?"
                    buttonText="Give up" iconName=""
            />
        </div>

        <div class="arenaClose" v-else>
            <h3>Arena closed</h3>
            <arena-prize></arena-prize>
            <div class="newArena container">
                <div class="col-xs-6">
                    <class-pick @pick-class="pickClass" />
                </div>
                <div class="col-xs-6">
                    <button @click="newArena()" class="btn btn-success" :disabled="!newClass">Enter arena</button>
                </div>
            </div>
            <hr/>
            <arena-stats/>
        </div>

    </div>
</template>


<script>
  import { mapActions, mapGetters } from 'vuex'
  import ArenaSum from './ArenaSum'
  import ArenaDuel from './ArenaDuel'
  import ArenaStats from './ArenaStats'
  import ArenaPrize from './ArenaPrize'
  import ConfirmationModal from '@/components/modals/ConfirmationModal'
  import ClassPick from '@/components/hsClass/ClassPick'

  export default {
    components: {ArenaSum, ArenaDuel, ArenaStats, ArenaPrize, ConfirmationModal, ClassPick},
    data () {
      return {
        newClass: ''
      }
    },
    computed: {
      ...mapGetters(['arenaOpen'])
    },
    methods: {
      ...mapActions(['closeArena', 'chooseDeckArena', 'openArena']),
      pickClass (pick) {
        this.newClass = pick
      },
      newArena () {
        this.chooseDeckArena(this.newClass)
        this.openArena()
      }
    }
  }
</script>
