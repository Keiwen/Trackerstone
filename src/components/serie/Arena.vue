<template>
    <div>
        <arena-sum/>
        <hr/>
        <div class="arenaOpen" v-if="arenaOpen">
            <arena-duel/>
            <arena-stats/>
            <hr/>
            <confirmation-modal
                    @modal-confirm="closeArena()"
                    modalText="Are you sure you want to give up arena?"
                    buttonText="Give up" iconName=""
            />
        </div>

        <div class="arenaClose" v-else>
            <p>Arena closed</p>
            <arena-prize></arena-prize>
            <arena-stats/>
            <div class="newArena">
                <label>Class: </label>
                <class-pick @pick-class="pickClass" />
                <button @click="newArena()" class="btn btn-success" :disabled="!newClass">Enter arena</button>
            </div>
        </div>

    </div>
</template>


<script>
  import { mapActions, mapGetters } from 'vuex'
  import * as storeMut from '@/store/mutation-types'
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
      ...mapActions(['closeArena']),
      pickClass (pick) {
        this.newClass = pick
      },
      newArena () {
        this.$store.commit(storeMut.CHOOSE_DECK_ARENA, this.newClass)
        this.$store.commit(storeMut.OPEN_ARENA)
      }
    }
  }
</script>
