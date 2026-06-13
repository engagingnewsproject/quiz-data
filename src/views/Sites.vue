<template>
  <div class="view view--sites">
    <p class="hint">
      News candidates are research sites filtered from all embed hosts using CME rules (June 2026).
      They are not auto-confirmed news organizations — mark each site before using in reporting.
    </p>
    <p class="hint hint--secondary">
      Each individual subdomain of a domain is counted as a separate site (e.g. www.nytimes.com vs m.nytimes.com).
      Review status is saved on the server when you change a dropdown.
    </p>
    <div class="filter">
      <form class="filters">
        <div class="top-filters">
          <label>List
            <select v-model="listMode" class="filter__input">
              <option value="candidates">News candidates</option>
              <option value="all">All embed sites</option>
            </select>
          </label>
          <label v-if="listMode === 'candidates'">Review status
            <select v-model="reviewStatusFilter" class="filter__input">
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed_news">Confirmed news</option>
              <option value="exclude">Excluded</option>
            </select>
          </label>
          <label>Search Sites<br/>
            <input v-model="filters.search.val" class="filter__input" type="text" />
          </label>
          <span class="filter-actions">
            <button type="button" class="btn" v-on:click="exportSites">Export CSV</button>
            <button type="button" class="btn" v-on:click="triggerImport">Import CSV</button>
            <input
              ref="importInput"
              type="file"
              accept=".csv,text/csv"
              class="visually-hidden"
              v-on:change="importSites"
            />
            <button class="btn show-filters" v-on:click.prevent="toggleFilters">{{ showFilters ? 'Hide' : 'Show'}} Filters</button>
          </span>
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
        v-bind:sites="filteredSites"
        v-bind:listMode="listMode"></SiteTotals>

      <SitePreview 
        v-bind:sites="filteredSites"
        v-bind:embeds="embeds"
        v-bind:quizzes="quizzes"
        v-bind:loading="loading"
        v-bind:showCandidateColumns="listMode === 'candidates'"></SitePreview>
    </section>
    <section class="no-sites" v-else>
      No sites found for this view and filters.
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import SitePreview from "@/components/SitePreview.vue";
import SiteTotals from "@/components/SiteTotals.vue";
import { mapGetters } from "vuex";
import { downloadCsv, parseCsv } from "@/utils/exportCsv";

export default {
  name: "sites",
  data: function() {
    return {
      loading: false,
      showFilters: false,
      listMode: "candidates",
      reviewStatusFilter: "",
      filters: {
        search: {
          val: '',
          keys: ['url', 'name', 'normalizedHost']
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
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters
    },
    fetchData() {
      const totalsReady = this.$store.getters.totals && this.$store.getters.totals.responses;
      if (this.sites.length === 0 || !totalsReady) {
        this.loading = true;
        return this.$store
          .dispatch("fetchAllData")
          .then(() => {
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
      this.loading = false;
    },
    exportSites() {
      const headers = [
        "embed_site_id",
        "embed_site_url",
        "normalized_host",
        "quiz_count",
        "owner_count",
        "inclusion_pass",
        "review_status",
        "notes",
        "views",
        "embeds"
      ];
      const rows = this.filteredSites.map((site) => ({
        embed_site_id: site.ID,
        embed_site_url: site.url,
        normalized_host: site.normalizedHost || "",
        quiz_count: site.quizzes,
        owner_count: site.ownerCount != null ? site.ownerCount : "",
        inclusion_pass: site.inclusionPass || "",
        review_status: site.reviewStatus || "",
        notes: site.candidateNotes || "",
        views: site.views,
        embeds: site.embeds
      }));
      const date = new Date().toISOString().slice(0, 10);
      downloadCsv(`quiz-news-sites-${date}.csv`, headers, rows, headers);
    },
    triggerImport() {
      this.$refs.importInput.click();
    },
    importSites(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const rows = parseCsv(e.target.result);
        this.$store.dispatch("importReviewStatusFromCsv", rows);
        event.target.value = "";
      };
      reader.readAsText(file);
    }
  },
  computed: {
    baseSiteList: function() {
      if (this.listMode === "candidates") {
        return this.newsCandidateSites;
      }
      return this.enrichedSites;
    },
    filteredSites: function() {
      let list = this.filter(this.baseSiteList, this.filters);

      if (this.listMode === "candidates" && this.reviewStatusFilter) {
        list = list.filter(
          (site) => site.reviewStatus === this.reviewStatusFilter
        );
      }

      return list;
    },
    ...mapGetters([
      "error",
      "sites",
      "enrichedSites",
      "newsCandidateSites",
      "quizzes",
      "nonDevSites",
      "embeds",
      "server",
      "filter"
    ])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_filters.scss";

.filter-actions {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: flex-end;
}

.hint--secondary {
  opacity: 0.85;
  font-size: 0.9em;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
