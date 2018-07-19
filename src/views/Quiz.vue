<template>
  <QuizInfo
    v-if="loading == false"
    v-bind:key="getQuiz.id"
    v-bind:quiz="getQuiz"
    v-bind:sortBy="getSort"
  ></QuizInfo>
  <Loader v-else-if="loading"/>
</template>

<script>
// @ is an alias to /src

import QuizInfo from "@/components/QuizInfo.vue";
import Loader from "@/components/Loader.vue";
import { mapGetters } from "vuex";

export default {
  name: "theQuiz",
  data: function() {
    return {
      loading: true
    };
  },
  components: {
    QuizInfo,
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
      this.loading = true
      return this.$store.dispatch("fetchQuizClicks", this.$route.params.quizSlug).then(() => this.loading = false);
    }
  },
  computed: {
    getQuiz: function() {
      return this.quiz(this.$route.params.quizSlug);
    },
    getSort: function() {
      return {
        field: "date",
        order: "desc"
      };
    },
    ...mapGetters(["error", "quizzes", "quiz"])
  }
};
</script>
