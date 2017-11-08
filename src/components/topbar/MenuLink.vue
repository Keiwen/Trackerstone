<template>
  <menuitem>
    <router-link :to="{ name: routeName }">{{ label }}</router-link>
  </menuitem>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: 'Menu'
      },
      routeName: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>

.nav > menuitem {
  float: left;
  position: relative;
  display: block;
  & > a {
    color: #777;
    line-height: 20px;
    position: relative;
    display: block;
    padding: 15px;
    text-decoration: none;
    &:hover {
      border-bottom: 1px solid #000000;
    }

  }
  & .fa-icon {
    margin: auto;
  }
}

.router-link-exact-active {
  border-bottom: 1px solid #D3921F;
}


</style>
