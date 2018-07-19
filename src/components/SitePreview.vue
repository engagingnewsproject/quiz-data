<template>
  <div class="sites" v-if="loading == false">
    <h3>Sites</h3>
    <p>{{ sites.length}} Found</p>
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
          v-bind:site="site">
          <td>{{ site.ID }}</td>
          <td><a :href="site.url" class="site__link">{{ site.name }}</a></td>
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
