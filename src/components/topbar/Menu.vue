<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <span class="navbar-brand">
        <img src="../../assets/logo.png">
        <span class="hidden-xs">Trackerstone</span>
      </span>

      <menu class="nav navbar-nav">
        <menu-link label="Track serie" routeName="serie" iconName="trophy"></menu-link>
        <menu-link label="Manage deck types" routeName="deckTypesList" iconName="list"></menu-link>
        <menu-link label="Manage decks" routeName="deckList" iconName="th-large"></menu-link>
        <menu-link label="Arena" routeName="arena" iconName="gift"></menu-link>
        <menu-link label="Settings" routeName="settings" iconName="cog"></menu-link>
      </menu>

    </div>
  </nav>
</template>

<script>
import MenuLink from './MenuLink'

export default {
  components: { MenuLink }
}
</script>

<style lang="scss" scoped>
.navbar-brand {
  & > img {
    display: inline;
    height: 50px;
  }
  padding: 0;
  margin-right: 25px;
}

.navbar-xs {
  position: fixed;
  z-index: 1030;
  top: 0;
  left: 0;
}

</style>
