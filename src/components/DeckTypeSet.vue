<template>
    <div class="container">
        <h2>Manage deck types</h2>
        <ul>
            <li v-for="type in types">
                {{ getClassName(type.hsClass) }} {{ type.name }} ({{ type.archetype }})
                <icon name="star" v-if="type.top" />
                <button @click="remove(type)"  class="btn btn-danger">
                    Remove <icon name="trash" />
                </button>
            </li>
        </ul>

        <hr/>
        <label>Class: </label>
        <class-pick @pick-class="pickClass"></class-pick>
        <label>Archetype: </label>
        <select v-model="newArchetype">
            <option v-for="archetype in archetypes">{{ archetype }}</option>
        </select>
        <label>Name: </label>
        <input type="text" v-model="newName" @keyup.enter="add()"/>
        <label for="type_top">Star: </label>
        <input type="checkbox" v-model="newTop" id="type_top"/>
        <button @click="add()" class="btn btn-success">Add</button>

        <br/><br/>

    </div>
</template>


<script>

  import { mapGetters } from 'vuex'
  import * as storeMut from '../store/mutation-types'
  import ClassPick from '@/components/ClassPick'

  export default {
    components: {ClassPick},
    data () {
      return {
        newName: '',
        newClass: '',
        newTop: false,
        newArchetype: ''
      }
    },
    computed: {
      ...mapGetters(['types', 'archetypes']),
      typesTopFirst () {
        const top = this.$store.getters.getTypesFiltered('top')
        const noTop = this.$store.getters.getTypesFiltered('top', false)
        return top.concat(noTop)
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
      remove (type) {
        this.$store.commit(storeMut.REMOVE_DECKTYPE, type)
      },
      getClassName (id) {
        return this.$store.getters.className(id)
      }
    }
  }

</script>
