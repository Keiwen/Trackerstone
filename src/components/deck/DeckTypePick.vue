<template>
    <select v-model="pick" @change="pickType()">
        <option :value="{}">Undefined</option>
        <optgroup label="Stared">
            <option v-for="type in getTypesOnTop()" :value="type">{{ generateTypeTitle(type) }}</option>
        </optgroup>
        <optgroup label="------">
            <option v-for="type in getTypesOnTop(false)" :value="type">{{ generateTypeTitle(type) }}</option>
        </optgroup>
    </select>
</template>


<script>

  import { mapGetters } from 'vuex'

  export default {
    props: ['initialPick'],
    data () {
      return {
        pick: {}
      }
    },
    computed: {
      ...mapGetters(['getTypesOnTop', 'generateTypeTitle'])
    },
    methods: {
      getClassName (id) {
        return this.$store.getters.className(id)
      },
      pickType () {
        this.$emit('pick-type', this.pick)
      }
    },
    mounted: function () {
      if (typeof this.initialPick !== 'undefined') this.pick = this.initialPick
    }
  }

</script>
