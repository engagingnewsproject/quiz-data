<template>
  <div class="view view--embeds">
    <div class="filter">
      <form class="filters">
        <div class="top-filters">
          <label>Search Embeds<br/>
            <input v-model="filters.search.val" class="filter__input" type="text" />
          </label>
          <span>
          <button class="btn show-filters" v-on:click.prevent="toggleFilters">{{ showFilters ? 'Hide' : 'Show'}} Filters</button></span>
        </div>
        <div class="extra-filters" v-if="showFilters">
          <label>Dev Embeds<br/>
            <select v-model="filters.keys.isDev.val">
              <option value="0">Exclude Dev Embeds</option>
              <option value="">Include Dev Embeds</option>
              <option value="1">Dev Embeds Only</option>
            </select>
          </label>
          <label>At least <input v-model="filters.keys.views.val" class="filter__input filter__input--tiny" type="number" /> Views
          </label>
          <label>Quiz ID = <input v-model="filters.keys.quizID.val" class="filter__input filter__input--tiny" type="number" />
          </label>
          <label>Site ID = <input v-model="filters.keys.siteID.val" class="filter__input filter__input--tiny" type="number" />
          </label>
          <label>Added 
            <select v-model="filters.keys.createdAt.operator">
              <option value="<=">After</option>
              <option value=">=">Before</option>
            </select>
            <input v-model="filters.keys.createdAt.val" class="filter__input filter__input--date" type="date" />
          </label>
          <label>Updated 
            <select v-model="filters.keys.updatedAt.operator">
              <option value="<=">After</option>
              <option value=">=">Before</option>
            </select>
            <input v-model="filters.keys.updatedAt.val" class="filter__input filter__input--date" type="date" />
          </label>
        </div>
      </form>
    </div>

    <section class="embeds" v-if="filteredEmbeds.length > 0">
      <EmbedTotals 
        v-bind:embeds="filteredEmbeds"></EmbedTotals>
      <EmbedPreview 
        v-bind:embeds="filteredEmbeds"
        v-bind:loading="loading"></EmbedPreview>
    </section>
    <section class="no-embeds" v-else>
      No embeds found for search "{{ filters.search.val }}" and selected filters.
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import EmbedPreview from "@/components/EmbedPreview.vue";
import EmbedTotals from "@/components/EmbedTotals.vue";
import { mapGetters } from "vuex";

export default {
  name: "embeds",
  data: function() {
    return {
      search: "",
      loading: Boolean,
      showFilters: false,
      filters: {
        search: {
          val: '',
          keys: ['url']
        },
        keys: {
          isDev: {
            val: '0',
            operator: '==',
            type: 'match'
          },
          quizID: {
            val: '',
            operator: '==',
            type: 'match'
          },
          siteID: {
            val: '',
            operator: '==',
            type: 'match'
          },
          views: {
            val: 0,
            operator: '<=',
            type: 'morethan'
          },
          createdAt: {
            val: '2016-01-01',
            operator: '<=',
            type: 'dateafter'
          },
          updatedAt: {
            val: '2016-01-01',
            operator: '<=',
            type: 'dateafter'
          },
        }
      },
    };
  },
  components: {
    EmbedPreview,
    EmbedTotals
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
      if(this.embeds.length == 0) {
        this.loading = true
        console.log('fetching data')
        return this.$store.dispatch("fetchAllData").then(() => this.loading = false);
      } else {
        console.log('already have data')
        this.loading = false
      }
    },
    toggleFilters() {
      this.showFilters = !this.showFilters
    }
  },
  computed: {
    filteredEmbeds: function() {
      return this.filter(this.embeds, this.filters)
    },
    ...mapGetters(["error", "embeds", "filter", "nonDevEmbeds"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_table.scss";
@import "../scss/_filters.scss";

</style>

