<template>
  <div class="domains" v-if="loading == false">
    <h3>Domains</h3>
    <p>{{ domains.length}} Found</p>
    <table class="domains__table">
      <thead>
        <th>ID
          <Sort 
            v-bind:sortBy="'ID'"
            v-bind:type="'domains'"/></th>
        <th>Name
          <Sort 
            v-bind:sortBy="'name'"
            v-bind:type="'domains'"/></th>
        <th>Views
          <Sort 
            v-bind:sortBy="'views'"
            v-bind:type="'domains'"/></th>
        <th>Sites
          <Sort 
            v-bind:sortBy="'sites'"
            v-bind:type="'domains'"/></th>
        <th>Embeds
          <Sort 
            v-bind:sortBy="'embeds'"
            v-bind:type="'domains'"/></th>
        <th>
          <Sort 
            v-bind:sortBy="'quizzes'"
            v-bind:type="'domains'"/>Quizzes</th>
        <th>Date Added
          <Sort 
            v-bind:sortBy="'createdAt'"
            v-bind:type="'domains'"/></th>
      </thead>
      <tbody>
        <tr
          v-for="domain in domains"
          :key="domain.ID"
          v-bind:domain="domain">
          <td><router-link :to="{ name: 'domain', params: { domainID: domain.ID }}">{{ domain.ID }}</router-link></td>
          <td><a :href="domain.url" class="domain__link">{{ domain.name }}</a></td>
          <td>{{ domain.views }}</td>
          <td>{{ domain.sites }}</td>
          <td>{{ domain.embeds }}</td>
          <td>{{ domain.quizzes }}</td>
          <td>{{ domain.createdAt }}</td>
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
  name: "DomainPreview",
  props: {
    domains: Array,
    quizzes: Array,
    embeds: Array,
    loading: Boolean
  },
  components: {
    Loader,
    Sort
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_table.scss";

</style>
