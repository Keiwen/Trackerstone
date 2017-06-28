<template>
    <div class="hero" :class="heroClass" @click="heroClick()">
        {{ hsClass.name }}
    </div>
</template>


<script>

  export default {
    props: ['classKey', 'hsClass'],
    computed: {
      heroClass () {
        return 'hero-' + this.classKey
      }
    },
    methods: {
      heroClick () {
        this.$emit('hero-click', this.classKey)
      }
    }
  }

</script>

<style>
    .hero {
        border: 1px solid transparent;
    }

    .hero:hover {
        border: 1px solid #D3921F;
    }
</style>
