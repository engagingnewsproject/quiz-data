<template>
  <div class="view view--site-info" v-if="loading == false">
    <SiteInfo
      v-bind:site="getSite(siteID)"
    ></SiteInfo>

    <EmbedTotals 
      v-bind:embeds="getSiteEmbeds(siteID)"></EmbedTotals>
    
    <QuizTotals 
      v-bind:quizzes="getSiteQuizzes(siteID)"></QuizTotals>

    <QuizPreview 
      v-bind:quizzes="getSiteQuizzes(siteID)"></QuizPreview>

    <EmbedPreview 
      v-bind:embeds="getSiteEmbeds(siteID)"></EmbedPreview>
  </div>
  <Loader v-else-if="loading"/>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import SiteInfo from "@/components/SiteInfo.vue";
import EmbedPreview from "@/components/EmbedPreview.vue";
import EmbedTotals from "@/components/EmbedTotals.vue";
import QuizPreview from "@/components/QuizPreview.vue";
import QuizTotals from "@/components/QuizTotals.vue";
import Loader from "@/components/Loader.vue";


export default {
  name: "site",
  data: function() {
    return {
      siteID: Number,
      loading: true
    };
  },
  components: {
    SiteInfo,
    EmbedPreview,
    EmbedTotals,
    QuizPreview,
    QuizTotals,
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
      // only fetch if we need to
      this.siteID = this.$route.params.siteID
      console.log('loading site view', this.sites)
      if(this.sites.length == 0) {
        this.loading = true
        console.log('fetching data')
        return this.$store.dispatch("fetchAllData")
          .then(() => this.loading = false)
      } else {
        console.log('already have data')
        this.loading = false
      }
    }
  },
  computed: {
    ...mapGetters(["error", "sites", "getSite", "getSiteQuizzes", "getSiteEmbeds"])
  }
};
</script>
