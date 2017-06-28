<template>
    <div class="container-fluid">
        <div class="col-xs-6 col-sm-4" v-for="(hsClass, key) in classes" v-if="key || allowNone">
            <class-card :classKey="key" :hsClass="hsClass" @hero-click="pickClass" />
        </div>
    </div>
</template>


<script>

  import { mapGetters } from 'vuex'
  import ClassCard from './ClassCard'

  export default {
    components: {ClassCard},
    props: {
      allowNone: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters(['classes'])
    },
    methods: {
      pickClass (key) {
        this.$emit('pick-class', key)
      }
    }
  }

</script>
