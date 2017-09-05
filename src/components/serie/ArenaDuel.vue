<template>
    <div class="container-fluid">
        <div class="container">
            <div class="col-md-6">
                <h3>Current class</h3>
                <class-pick :initialPick="currentArena.id" :disabled="true"/>
            </div>
            <div class="col-md-6">
                <h3>Opponent class</h3>
                <class-pick @pick-class="pickOpponentClass" :initialPick="opponentArena.id" />
            </div>
        </div>
        <button @click="winArena()" class="btn btn-success">Win <icon name="thumbs-up" /></button>
        <button @click="looseArena()" class="btn btn-warning">Loss <icon name="thumbs-down" /></button>
    </div>
</template>


<script>
  import * as storeMut from '@/store/mutation-types'
  import { mapGetters, mapActions } from 'vuex'
  import ClassPick from '@/components/hsClass/ClassPick'
  import { SweetModal } from 'sweet-modal-vue'

  export default {
    components: {ClassPick, SweetModal},
    computed: {
      ...mapGetters(['currentArena', 'opponentArena'])
    },
    methods: {
      ...mapActions(['winArena', 'looseArena']),
      pickOpponentClass (hsClass) {
        this.$store.commit(storeMut.CHOOSE_OPPONENT_ARENA, hsClass)
      }
    }
  }

</script>
