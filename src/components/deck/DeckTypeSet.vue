<template>
    <div class="container-fluid manageForm choseForm">
      <div class="row">
        <div class="col-xs-6">
          <class-pick @pick-class="pickClass" id="pickClass" />
        </div>
        <div class="col-xs-6">
          <archetype-pick @pick-archetype="pickClass" id="pickArchetype" />
        </div>
      </div>

      <div class="row">
        <div class="col-xs-6">
          <input type="text" class="form-control" v-model="newName" @keyup.enter="add()" placeholder="Deck type name"/>
        </div>
        <div class="col-xs-6">
          <enhanced-check v-model="newTop" label="Star" :animate="true" class="starCheck" subClass="warning" />
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

<style lang="scss">
    .manageForm .row {
      margin-bottom: 15px;
    }
</style>
