<template>
  <div @click="heroClick()">
    <div class="hero" :class="heroClass" ></div>
    <span class="hero-label">{{ hsClass.name }}</span>
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

<style lang="scss">
@import '../../assets/scss/_import.scss';

    .hero {
        // background: url('../../assets/classes_sprite.png') 0 0 no-repeat;
        background: url('../../assets/icones_classes.png') 0 0 no-repeat;
    }

    .hero-warrior {
        background-position: -160px -280px;
    }

    .hero-shaman {
        background-position: -280px -40px;
    }

    .hero-rogue {
        background-position: -280px -280px;
    }

    .hero-paladin {
        background-position: -280px -160px;
    }

    .hero-hunter {
        background-position: -40px -40px;
    }

    .hero-druid {
        background-position: -160px -160px;
    }

    .hero-warlock {
        background-position: -160px -40px;
    }

    .hero-mage {
        background-position: -40px -160px;
    }

    .hero-priest {
        background-position: -40px -280px;
    }

</style>
