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
        <menu-link label="Card packs" routeName="pack"></menu-link>
        <menu-link label="Tips" routeName="tips"></menu-link>
        <menu-link label="Settings" routeName="settings"></menu-link>
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

.navbar {
  background-color: var(--main-bg);
  box-shadow: 0px 3px 6px var(--black-ts45);


  .navbar-brand {
    & > img {
      display: inline-block;
      height: 50px;
    }

    .hidden-xs {
      color: var(--main-color);
      font-family: 'Changa One', Helvetica, Arial, sans-serif;
      font-size: 20px;
      text-transform: uppercase;
      vertical-align: middle;
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
}


</style>
