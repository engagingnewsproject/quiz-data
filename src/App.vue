<template>
  <div  id="app"
        class="app"
        v-bind:class="{
          'app--error': error,
          'app--loading': loading
        }">
    <header class="container">
    <h1 class="app__title">Quiz Creator Data</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/domains">Domains</router-link>
        <router-link to="/sites">Sites</router-link>
        <router-link to="/quizzes">Quizzes</router-link>
        <router-link to="/embeds">Embeds</router-link>
      </nav>
    </header>
    <div class="visually-hidden" style="position: absolute; width: 0; height: 0;">
      <svg style="display: none;">
        <symbol id="icon-up" width="24" height="24" viewBox="0 0 24 24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </symbol>
        <symbol id="icon-down" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
          <path d="M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z"/>
          <path fill="none" d="M0,0h24v24H0V0z"/>
        </symbol>
    </svg>
    </div>
    <main class="main container" v-if="error">
      <p>Error</p>
    </main>
    <main class="main container">
      <router-view/>
    </main>
  </div>
</template>

<style lang="scss">
@import "scss/_global.scss";
</style>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters(["loading", "error"])
  }
};
</script>
