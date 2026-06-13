<template>
  <div class="sites" v-if="loading == false">
    <h3>Sites</h3>
    <p>{{ sites.length }} Found</p>
    <table class="sites__table">
      <thead>
        <th>ID
          <Sort 
            v-bind:sortBy="'ID'"
            v-bind:type="'sites'"/></th>
        <th>Name
          <Sort 
            v-bind:sortBy="'name'"
            v-bind:type="'sites'"/></th>
        <th v-if="showCandidateColumns">Inclusion pass
          <Sort
            v-bind:sortBy="'inclusionPass'"
            v-bind:type="'sites'"/></th>
        <th v-if="showCandidateColumns">Review status
          <Sort
            v-bind:sortBy="'reviewStatus'"
            v-bind:type="'sites'"/></th>
        <th>Views
          <Sort 
            v-bind:sortBy="'views'"
            v-bind:type="'sites'"/></th>
        <th>Embeds
          <Sort 
            v-bind:sortBy="'embeds'"
            v-bind:type="'sites'"/></th>
        <th>
          <Sort 
            v-bind:sortBy="'quizzes'"
            v-bind:type="'sites'"/>Quizzes</th>
        <th>Date Added
          <Sort 
            v-bind:sortBy="'createdAt'"
            v-bind:type="'sites'"/></th>
        <th>Is Dev
          <Sort 
            v-bind:sortBy="'isDev'"
            v-bind:type="'sites'"/></th>
      </thead>
      <tbody>
        <tr
          v-for="site in sites"
          v-bind:key="site.ID"
          v-bind:site="site">
          <td><router-link :to="{ name: 'site', params: { siteID: site.ID }}">{{ site.ID }}</router-link></td>
          <td><a :href="site.url" class="site__link">{{ site.name }}</a></td>
          <td v-if="showCandidateColumns">{{ site.inclusionPass }}</td>
          <td v-if="showCandidateColumns">
            <select
              v-if="site.isNewsCandidate"
              v-bind:value="site.reviewStatus"
              v-on:change="updateReviewStatus(site, $event.target.value)"
              class="review-status-select">
              <option value="pending">Pending</option>
              <option value="confirmed_news">Confirmed news</option>
              <option value="exclude">Exclude</option>
            </select>
          </td>
          <td>{{ site.views }}</td>
          <td>{{ site.embeds }}</td>
          <td>{{ site.quizzes }}</td>
          <td>{{ site.createdAt }}</td>
          <td>{{ site.isDev }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Loader v-else-if="loading"/>
</template>

<script>
import Loader from "@/components/Loader.vue";
import Sort from "@/components/Sort.vue";

export default {
  name: "SitePreview",
  props: {
    sites: Array,
    quizzes: Array,
    embeds: Array,
    loading: Boolean,
    showCandidateColumns: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Loader,
    Sort
  },
  methods: {
    updateReviewStatus(site, status) {
      this.$store
        .dispatch("setReviewStatus", {
          siteID: site.ID,
          normalizedHost: site.normalizedHost,
          status
        })
        .catch(() => {
          window.alert("Could not save review status. Please try again.");
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_table.scss";

.review-status-select {
  max-width: 10rem;
}
</style>
