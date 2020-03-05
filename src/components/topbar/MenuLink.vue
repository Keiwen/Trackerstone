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
  padding: 15px;
  & > a {
    color: var(--main-color);
    line-height: 20px;
    display: inline-block;
    position: relative;
    text-decoration: none;
    &:hover::before {
        // content: '';
        // width: 100%;
        // display: block;
        // position: absolute;
        // bottom:-16px;
        // height:5px;
        // transition: .4s ease-in-out;
        // background: green;
        // opacity: 1;

  }
  & .fa-icon {
    margin: auto;
  }
}

:not(.router-link-exact-active)::before {
  content: '';
  width: 0;
  display: block;
  position: absolute;
  bottom:-16px;
  height:5px;
  transition: .4s ease-in-out;
  background: var(--orange-ts);
  opacity: 0;
}

.router-link-exact-active::before {
    content: '';
    width: 100%;
    display: block;
    position: absolute;
    bottom:-16px;
    height:5px;
    transition: .4s ease-in-out;
    background: var(--orange-ts);
    opacity: 1;
  }
}


</style>
