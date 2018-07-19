<template>
  <div class="view view--quizzes" v-if="loading == false">
    <div class="filter">
      <form class="filters">
        <div class="top-filters">
          <label>Search Quizzes<br/>
            <input v-model="filters.search.val" class="filter__input" type="text" />
          </label>
          <span>
          <button class="btn show-filters" v-on:click.prevent="toggleFilters">{{ showFilters ? 'Hide' : 'Show'}} Filters</button></span>
        </div>
        <div class="extra-filters" v-if="showFilters">
          <label>Quiz Status<br/>
            <select v-model="filters.keys.status.val">
              <option value="">All</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </label>
          <label>At least <input v-model="filters.keys.views.val" class="filter__input filter__input--tiny" type="number" /> Views
          </label>
          <label>At least <input v-model="filters.keys.questions.val" class="filter__input filter__input--tiny" type="number" /> Questions
          </label>
          <label>At least <input v-model="filters.keys.starts.val" class="filter__input filter__input--tiny" type="number" /> Starts
          </label>
          <label>At least <input v-model="filters.keys.startPercentage.val" class="filter__input filter__input--tiny" type="number" /> Start Percentage
          </label>
          <label>At least <input v-model="filters.keys.finishes.val" class="filter__input filter__input--tiny" type="number" /> Finishes
          </label>
          <label>At least <input v-model="filters.keys.finishPercentage.val" class="filter__input filter__input--tiny" type="number" /> Finish Percentage
          </label>
          <label>Added 
            <select v-model="filters.keys.createdAt.operator">
              <option value="<=">After</option>
              <option value=">=">Before</option>
            </select>
            <input v-model="filters.keys.createdAt.val" class="filter__input filter__input--date" type="date" />
          </label>
        </div>
      </form>
    </div>

    <QuizTotals 
      v-if="filteredQuizzes.length > 0" 
      v-bind:quizzes="filteredQuizzes"></QuizTotals>

    <QuizPreview 
      v-if="filteredQuizzes.length > 0" 
      v-bind:quizzes="filteredQuizzes"></QuizPreview>

    <section class="no-quizzes" v-else>
      No quizzes found for search "{{ filters.search.val }}" and the selected filters.
    </section>
  </div>
  <Loader v-else-if="loading"/>
</template>

<script>
// @ is an alias to /src
import QuizPreview from "@/components/QuizPreview.vue";
import QuizTotals from "@/components/QuizTotals.vue";
import Loader from "@/components/Loader.vue";
import { mapGetters } from "vuex";

export default {
  name: "Quizzes",
  data: function() {
    return {
      loading: Boolean,
      showFilters: false,
      filters: {
        search: {
          val: '',
          keys: ['title']
        },
        keys: {
          status: {
            val: 'published',
            operator: '==',
            type: 'match'
          },
          views: {
            val: 0,
            operator: '<=',
            type: 'morethan'
          },
          starts: {
            val: 0,
            operator: '<=',
            type: 'morethan'
          },
          startPercentage: {
            val: 0,
            operator: '<=',
            type: 'morethan'
          },
          finishes: {
            val: 0,
            operator: '<=',
            type: 'morethan'
          },
          finishPercentage: {
            val: 0,
            operator: '<=',
            type: 'morethan'
          },
          questions: {
            val: 0,
            operator: '<=',
            type: 'morethan'
          },
          createdAt: {
            val: '2016-01-01',
            operator: '<=',
            type: 'dateafter'
          }
        }
      }
    };
  },
  components: {
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
    toggleFilters() {
      this.showFilters = !this.showFilters
    },
    fetchData() {
      if(this.quizzes.length == 0) {
        this.loading = true
        return this.$store.dispatch("fetchQuizzes").then(() => this.loading = false)
      } else {
        console.log('already have quiz data')
        this.loading = false
      }
    }
  },
  computed: {
    filteredQuizzes: function() {
      return this.filter(this.quizzes, this.filters)
    },
    ...mapGetters(["error", "quizzes", "filter"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_filters.scss";
</style>
