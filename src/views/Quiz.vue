<template>
  <div class="view view--quiz-info" v-if="loading == false">
    <QuizInfo
      v-bind:quiz="getQuiz(quizID)"
    ></QuizInfo>

    <SiteTotals 
      v-bind:sites="getQuizSites(quizID)"></SiteTotals>
    <EmbedTotals 
      v-bind:embeds="getQuizEmbeds(quizID)"></EmbedTotals>
    
    <SitePreview 
      v-bind:sites="getQuizSites(quizID)"></SitePreview>

    <EmbedPreview 
      v-bind:embeds="getQuizEmbeds(quizID)"></EmbedPreview>
  </div>
  <Loader v-else-if="loading"/>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import QuizInfo from "@/components/QuizInfo.vue";
import EmbedPreview from "@/components/EmbedPreview.vue";
import EmbedTotals from "@/components/EmbedTotals.vue";
import SitePreview from "@/components/SitePreview.vue";
import SiteTotals from "@/components/SiteTotals.vue";
import Loader from "@/components/Loader.vue";


export default {
  name: "quiz",
  data: function() {
    return {
      quizID: Number,
      loading: true
    };
  },
  components: {
    QuizInfo,
    EmbedPreview,
    EmbedTotals,
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
      this.quizID = this.$route.params.quizID
      console.log('loading quiz view', this.sites)
      if(this.quizzes.length == 0) {
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
    ...mapGetters(["error", "quizzes", "getQuiz", "getQuizSites", "getQuizEmbeds"])
  }
};
</script>
