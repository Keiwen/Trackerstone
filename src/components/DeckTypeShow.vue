<template>
    <span>
        {{ getClassName(type.hsClass) }} {{ type.name }} ({{ type.archetype }})
        <icon name="star" v-if="type.top" />
    </span>
</template>


<script>

  export default {
    props: ['type'],
    methods: {
      getClassName (id) {
        return this.$store.getters.className(id)
      }
    }
  }

</script>
