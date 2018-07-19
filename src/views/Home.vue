<template>
  <div class="home-view"  v-if="loading == false">
    <Overview
      v-bind:sites="sites"
      v-bind:embeds="embeds"
      v-bind:quizzes="quizzes"
      v-bind:loading="loading"></Overview>
  </div>
  <Loader v-else-if="loading"></Loader>

</template>

<script>
// @ is an alias to /src
import Overview from "@/components/Overview.vue";
import Loader from "@/components/Loader.vue";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    Overview,
    Loader
  },
  data: function() {
    return {
      loading: true
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      if(this.sites.length == 0) {
        this.loading = true
        console.log('fetching data')
        return this.$store.dispatch("fetchAllData").then(() => this.loading = false);
      } else {
        console.log('already have data')
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters(["error", "sites", "quizzes", "nonDevSites", "embeds"])
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";

</style>
