<template>
    <div class="container-fluid">
        <label>Class: </label>
        <class-pick @pick-class="pickClass" />
        <label>Archetype: </label>
        <archetype-pick @pick-archetype="pickArchetype" />
        <label>Name: </label>
        <input type="text" v-model="newName" @keyup.enter="add()"/>
        <enhanced-check v-model="newTop" label="Star" :animate="true" class="starCheck" subClass="warning" />
        <button @click="add()" class="btn btn-success">Add</button>
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
    .starCheck {
        display: inline-block;
    }
</style>
