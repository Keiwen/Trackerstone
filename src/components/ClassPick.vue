<template>
    <select v-model="pick" @change="pickClass()">
        <option v-for="(hsClass, key) in classes" :value="key">{{ hsClass.name }}</option>
    </select>
</template>


<script>

  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        pick: ''
      }
    },
    computed: {
      ...mapGetters(['classes'])
    },
    methods: {
      pickClass () {
        this.$emit('pick-class', this.pick)
      }
    }
  }

</script>
