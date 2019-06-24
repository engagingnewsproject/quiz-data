<template>
  <div class="view view--site-info" v-if="loading == false">
    <DomainInfo
      v-bind:domain="getDomain(domainID)"
    ></DomainInfo>

    <SiteTotals 
      v-bind:sites="getDomainSites(domainID)"></SiteTotals>

    <EmbedTotals 
      v-bind:embeds="getDomainEmbeds(domainID)"></EmbedTotals>
    
    <QuizTotals 
      v-bind:quizzes="getDomainQuizzes(domainID)"></QuizTotals>

    <SitePreview 
      v-bind:sites="getDomainSites(domainID)"></SitePreview>

    <QuizPreview 
      v-bind:quizzes="getDomainQuizzes(domainID)"></QuizPreview>
   

    <EmbedPreview 
      v-bind:embeds="getDomainEmbeds(domainID)"></EmbedPreview>
     
  </div> 
  <Loader v-else-if="loading"/>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import DomainInfo from "@/components/DomainInfo.vue";
import EmbedPreview from "@/components/EmbedPreview.vue";
import EmbedTotals from "@/components/EmbedTotals.vue";
import QuizPreview from "@/components/QuizPreview.vue";
import QuizTotals from "@/components/QuizTotals.vue";
import SitePreview from "@/components/SitePreview.vue";
import SiteTotals from "@/components/SiteTotals.vue";
import Loader from "@/components/Loader.vue";


export default {
  name: "domain",
  data: function() {
    return {
      domainID: Number,
      loading: true
    };
  },
  components: {
    DomainInfo,
    EmbedPreview,
    EmbedTotals,
    QuizPreview,
    QuizTotals,
    SitePreview,
    SiteTotals,
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
      this.domainID = this.$route.params.domainID
      console.log('loading site view', this.domains)
      if(this.domains.length == 0) {
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
    ...mapGetters(["error", "domains", "sites", "getDomain", "getDomainQuizzes", "getDomainEmbeds", "getDomainSites"])
  }
};
</script>
