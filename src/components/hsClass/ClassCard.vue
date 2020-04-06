<template>
  <div @click="heroClick()" class="class-card">
    <div class="hero" :class="heroClass" ></div>
    <span class="hero-label">{{ hsClass.name }}</span>
  </div>

</template>


<script>
  export default {
    props: ['hsClass'],
    computed: {
      heroClass () {
        return 'hero-' + this.hsClass.id
      }
    },
    methods: {
      heroClick () {
        this.$emit('hero-click', this.hsClass.id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/mixins.scss';

  .hero {
      display: block;
      width: 25px;
      height: 25px;
      margin: 0 auto;
      border-radius: 50%;
      padding: 40px;
      cursor: pointer;
      @include transition(0.5s);
      @include transform(scale(0.6));
      margin-bottom: -14px;
      background: url('../../assets/icones_classes.png') 0 0 no-repeat;

      &:hover {
        @include transform(scale(0.8));
        @include transition(0.5s);
      }
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

    .hero- {
      background-position: -40px -400px;
    }

    .hero-dk {
      background-position: -160px -400px;
    }

    .hero-demon_hunter {
      background-position: -280px -400px;
    }

</style>
