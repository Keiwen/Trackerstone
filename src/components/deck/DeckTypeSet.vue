<template>
    <div class="container-fluid settingForm choseForm">
      <div class="row">
        <div class="col-xs-12 col-sm-6 align-col">
          <label>Class: </label>
          <class-pick @pick-class="pickClass" />
        </div>
        <div class="col-xs-12 col-sm-6 align-col">
            <label>Archetype: </label>
            <archetype-pick @pick-archetype="pickArchetype" />
        </div>
        <div class="col-xs-12 col-sm-6 align-col">
            <label>Name: </label>
            <input type="text" v-model="newName" @keyup.enter="add()"/>
        </div>
        <div class="col-xs-12 col-sm-6 align-col">
              <enhanced-check v-model="newTop" label="Star" :animate="true" class="starCheck" subClass="warning" />
              <button @click="add()" class="btn btn-success">Add</button>
        </div>
      </div>
    </div>
</template>


<script>

  import * as storeMut from '@/store/mutation-types'
  import { mapActions } from 'vuex'
  import ClassPick from '@/components/hsClass/ClassPick'
  import ArchetypePick from './ArchetypePick.vue'
  import { EnhancedCheck } from 'vue-enhanced-check'

  export default {
    components: {ClassPick, ArchetypePick, EnhancedCheck},
    data () {
      return {
        newName: '',
        newClass: '',
        newTop: false,
        newArchetype: ''
      }
    },
    methods: {
      ...mapActions(['addSuccess']),
      add () {
        this.$store.commit(storeMut.ADD_DECKTYPE, {
          name: this.newName,
          hsClass: this.newClass,
          archetype: this.newArchetype,
          top: this.newTop
        })
        this.addSuccess('Deck type added')
      },
      pickClass (pick) {
        this.newClass = pick
      },
      pickArchetype (pick) {
        this.newArchetype = pick
      }
    }
  }

</script>

<style>
</style>
