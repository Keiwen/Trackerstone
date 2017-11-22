<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <span class="navbar-brand">
        <img src="../../assets/logo.png">
        <span class="hidden-xs">Trackerstone</span>
      </span>

      <menu class="nav navbar-nav">
        <menu-link label="Serie" routeName="serie"></menu-link>
        <menu-link label="Deck types" routeName="deckTypesList"></menu-link>
        <menu-link label="Decks" routeName="deckList"></menu-link>
        <menu-link label="Arena" routeName="arena"></menu-link>
        <menu-link label="Settings" routeName="settings"></menu-link>
        <menu-link label="Hints" routeName="hints"></menu-link>
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
