<template>
  <div class="view view--domains">
    <p class="hint">Domains are counted as one per "domain" or "root url." For example, https://www.nytimes.com and https://nytimes.com would count as one domain (nytimes.com) and two sites. No Dev sites are included here.</p>
    <div class="filter">
      <form class="filters">
        <div class="top-filters">
          <label>Search Domains<br/>
            <input v-model="filters.search.val" class="filter__input" type="text" />
          </label>
          <span>
          <button class="btn show-filters" v-on:click.prevent="toggleFilters">{{ showFilters ? 'Hide' : 'Show'}} Filters</button></span>
        </div>
        <div class="extra-filters" v-if="showFilters">
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

    <section class="domains" v-if="filteredDomains.length > 0">

      <DomainTotals 
        v-bind:domains="filteredDomains"></DomainTotals>

      <DomainPreview 
        v-bind:domains="filteredDomains"
        v-bind:embeds="embeds"
        v-bind:quizzes="quizzes"
        v-bind:loading="loading"></DomainPreview>
    </section>
    <section class="no-domains" v-else>
      No domains found for search "{{ filters.search.val }}" with these filters.
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import DomainPreview from "@/components/DomainPreview.vue";
import DomainTotals from "@/components/DomainTotals.vue";
import { mapGetters } from "vuex";

export default {
  name: "domains",
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
    DomainPreview,
    DomainTotals
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
      if(this.domains.length == 0) {
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
    filteredDomains: function() {
      return this.filter(this.domains, this.filters)
    },
    ...mapGetters(["error", "domains", "sites", "quizzes", "nonDevSites","embeds", "server", "filter"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_filters.scss";
</style>