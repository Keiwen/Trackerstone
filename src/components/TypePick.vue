<template>
    <select v-model="pick" @change="pickType()">
        <optgroup label="Stared">
            <option v-for="type in typesTop" :value="type">{{ getClassName(type.hsClass) }} {{ type.name }} ({{ type.archetype }})</option>
        </optgroup>
        <optgroup label="------">
            <option v-for="type in typesNoTop" :value="type">{{ getClassName(type.hsClass) }} {{ type.name }} ({{ type.archetype }})</option>
        </optgroup>
    </select>
</template>


<script>

  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        pick: {}
      }
    },
    computed: {
      ...mapGetters(['types']),
      typesTop () {
        return this.$store.getters.getTypesFiltered('top')
      },
      typesNoTop () {
        return this.$store.getters.getTypesFiltered('top', false)
      }
    },
    methods: {
      getClassName (id) {
        return this.$store.getters.className(id)
      },
      pickType () {
        this.$emit('pick-type', this.pick)
      }
    }
  }

</script>
