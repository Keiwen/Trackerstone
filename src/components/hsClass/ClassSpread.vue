<template>
    <div class="row class-spread">
        <div class="col-xs-3 col-sm-3" v-for="(hsClass, key) in classes"
             v-if="key && allowNeutral || key && key !== 'neutral' || allowNone && (!key || key !== 'neutral') || allowNone && allowNeutral">
            <class-card :hsClass="hsClass" @hero-click="pickClass" />
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
      },
      allowNeutral: {
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


<style lang="scss" scoped>

    .class-spread {
        padding: 0;
    }

</style>
