<template>
    <icon name="info-circle" :scale="2" :class="cssClass"></icon>
</template>


<script>
  export default {
    props: {
      noted: {
        type: Boolean,
        default: false
      },
      before: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      cssClass () {
        let cssClass = this.before ? 'infoNoteBefore' : 'infoNote'
        if (this.noted) cssClass += ' noted'
        return cssClass
      }
    }
  }
</script>

<style lang="scss" scoped>

    .infoNote,.infoNoteBefore {
        cursor: pointer;
        &.noted {
            color: var(--orange-ts)!important;
        }
    }

</style>
