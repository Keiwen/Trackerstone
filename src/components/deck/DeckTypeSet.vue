<template>
    <div class="container">
        <label>Class: </label>
        <class-pick @pick-class="pickClass" />
        <label>Archetype: </label>
        <archetype-pick @pick-archetype="pickArchetype" />
        <label>Name: </label>
        <input type="text" v-model="newName" @keyup.enter="add()"/>
        <label for="type_top">Star: </label>
        <input type="checkbox" v-model="newTop" id="type_top"/>
        <button @click="add()" class="btn btn-success">Add</button>
    </div>
</template>


<script>

  import * as storeMut from '@/store/mutation-types'
  import ClassPick from '@/components/hsClass/ClassPick'
  import ArchetypePick from './ArchetypePick.vue'

  export default {
    components: {ClassPick, ArchetypePick},
    data () {
      return {
        newName: '',
        newClass: '',
        newTop: false,
        newArchetype: ''
      }
    },
    methods: {
      add () {
        this.$store.commit(storeMut.ADD_DECKTYPE, {
          name: this.newName,
          hsClass: this.newClass,
          archetype: this.newArchetype,
          top: this.newTop
        })
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
