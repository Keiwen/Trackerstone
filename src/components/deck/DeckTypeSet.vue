<template>
    <div class="container-fluid manageForm choseForm">
      <div class="row">
        <div class="col-xs-6">
          <class-pick @pick-class="pickClass" />
        </div>
        <div class="col-xs-6">
          <archetype-pick @pick-archetype="pickArchetype" />
        </div>
      </div>

      <div class="row">
        <div class="col-xs-6">
          <input type="text" class="form-control" v-model="newName" @keyup.enter="add()" placeholder="Deck type name"/>
        </div>
        <div class="col-xs-6">
		  <input type="checkbox" id="newTop" value="true" v-model="newTop">
		  <label for="newTop">Star</label>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <button @click="add()" class="btn btn-success">Add deck type</button>
        </div>
      </div>

    </div>
</template>


<script>
  import * as storeMut from '@/store/mutation-types'
  import { mapActions } from 'vuex'
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
      ...mapActions(['addSuccess']),
      add () {
        console.log('add type', this.newName, this.newClass, this.newArchetype)
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

<style lang="scss">
    .manageForm .row {
      margin-bottom: 15px;
    }
</style>
