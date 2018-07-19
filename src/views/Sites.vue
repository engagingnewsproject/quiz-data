<template>
  <div class="view view--sites">
    <div class="filter">
      <form class="filters">
        <div class="top-filters">
          <label>Search Sites<br/>
            <input v-model="filters.search.val" class="filter__input" type="text" />
          </label>
          <span>
          <button class="btn show-filters" v-on:click.prevent="toggleFilters">{{ showFilters ? 'Hide' : 'Show'}} Filters</button></span>
        </div>
        <div class="extra-filters" v-if="showFilters">
          <label>Dev Sites<br/>
            <select v-model="filters.keys.isDev.val">
              <option value="0">Exclude Dev Sites</option>
              <option value="">Include Dev Sites</option>
              <option value="1">Dev Sites Only</option>
            </select>
          </label>
          <label>At least <input v-model="filters.keys.quizzes.val" class="filter__input filter__input--tiny" type="number" /> Quizzes
          </label>
          <label>At least <input v-model="filters.keys.views.val" class="filter__input filter__input--tiny" type="number" /> Views
          </label>
          <label>At least <input v-model="filters.keys.embeds.val" class="filter__input filter__input--tiny" type="number" /> Embeds
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

    <section class="sites" v-if="filteredSites.length > 0">

      <SiteTotals 
        v-bind:sites="filteredSites"></SiteTotals>

      <SitePreview 
        v-bind:sites="filteredSites"
        v-bind:embeds="embeds"
        v-bind:quizzes="quizzes"
        v-bind:loading="loading"></SitePreview>
    </section>
    <section class="no-sites" v-else>
      No sites found for search "{{ filters.search.val }}" with these filters.
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import SitePreview from "@/components/SitePreview.vue";
import SiteTotals from "@/components/SiteTotals.vue";
import { mapGetters } from "vuex";

export default {
  name: "sites",
  data: function() {
    return {
      loading: Boolean,
      showFilters: false,
      filters: {
        search: {
          val: '',
          keys: ['url', 'name']
        },
        keys: {
          isDev: {
            val: '0',
            operator: '==',
            type: 'match'
          },
          quizzes: {
            val: 0,
            operator: '<=',
            type: 'morethan'
          },
          views: {
            val: 0,
            operator: '<=',
            type: 'morethan'
          },
          embeds: {
            val: 0,
            operator: '<=',
            type: 'morethan'
          },
          createdAt: {
            val: '2016-01-01',
            operator: '<=',
            type: 'dateafter'
          },
        }
      }
    };
  },
  components: {
    SitePreview,
    SiteTotals
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
      // only fetch if we need to
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
    filteredSites: function() {
      // return this.filter(this.sites, this.filters);
      return this.filter(this.sites, this.filters)
    },
    ...mapGetters(["error", "sites", "quizzes", "nonDevSites","embeds", "server", "filter", "filterSites"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_filters.scss";
</style>