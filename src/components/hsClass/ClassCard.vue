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
        background: url('../../assets/classes_sprite.png') 0 0 no-repeat;
    }

    .hero-warrior {
        background-position:-375px -675px;
    }

    .hero-shaman {
        background-position: -675px -75px;
    }

    .hero-rogue {
        background-position: -675px -675px;
    }

    .hero-paladin {
        background-position: -675px -375px;
    }

    .hero-hunter {
        background-position: -75px -75px;
    }

    .hero-druid {
        background-position:-375px -375px;
    }

    .hero-warlock {
        background-position: -375px -75px;
    }

    .hero-mage {
        background-position: -75px -375px;
    }

    .hero-priest {
        background-position: -75px -675px;
    }

</style>
