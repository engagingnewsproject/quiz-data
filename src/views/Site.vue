<template>
  <SiteInfo
    v-if="loading == false"
    v-bind:key="getSite.id"
    v-bind:site="getSite"
    v-bind:sortBy="getSort"
  ></SiteInfo>
  <Loader v-else-if="loading"/>
</template>

<script>
// @ is an alias to /src
import SiteInfo from "@/components/SiteInfo.vue";
import Loader from "@/components/Loader.vue";
import { mapGetters } from "vuex";

export default {
  name: "site",
  data: function() {
    return {
      loading: true
    };
  },
  components: {
    SiteInfo,
    Loader
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
      // this.loading = true
      console.log('fetching data')
      /*return this.$store.dispatch("fetchSitePosts", this.$route.params.siteID).then(() => {
          this.loading = false
          console.log('eftched')
        });*/
    }
  },
  computed: {
    getSite: function() {
      return this.site(this.$route.params.siteID);
    },
    getSort: function() {
      return {
        field: "clicks",
        order: "desc"
      };
    },
    ...mapGetters(["error", "sites", "site"])
  }
};
</script>
