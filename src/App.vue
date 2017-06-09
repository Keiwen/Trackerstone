<template>
  <div id="app">
      <div>
          <router-link :to="{ name: 'serie' }">Track serie</router-link>
          -
          <router-link :to="{ name: 'serieSet' }">Set serie data</router-link>
          -
          <router-link :to="{ name: 'deckTypesSet' }">Manage deck types</router-link>
          -
          <router-link :to="{ name: 'deckList' }">Manage decks</router-link>
      </div>
    <img src="./assets/logo.png" style="height: 150px">
    <router-view></router-view>
    <cookie-law theme="dark-lime" message="This website uses local navigator storage to save and load data."></cookie-law>
  </div>
</template>

<script>
  import CookieLaw from 'vue-cookie-law'

  export default {
    name: 'app',
    components: { CookieLaw }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
