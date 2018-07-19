<template>
  <div class="embeds" v-if="loading == false">
    <h3>Embeds</h3>
    <p>{{ embeds.length}} Found</p>
    <table class="embeds__table">
      <thead>
        <th>ID
          <Sort 
            v-bind:sortBy="'ID'"
            v-bind:type="'embeds'"/></th>
        <th>URL
          <Sort 
            v-bind:sortBy="'url'"
            v-bind:type="'embeds'"/></th>
        <th>Views
          <Sort 
            v-bind:sortBy="'views'"
            v-bind:type="'embeds'"/></th>
        <th>Site ID
          <Sort 
            v-bind:sortBy="'siteID'"
            v-bind:type="'embeds'"/></th>
        <th>Quiz ID
          <Sort 
            v-bind:sortBy="'quizID'"
            v-bind:type="'embeds'"/></th>
        <th>Created
          <Sort 
            v-bind:sortBy="'createdAt'"
            v-bind:type="'embeds'"/></th>
        <th>Updated
          <Sort 
            v-bind:sortBy="'updatedAt'"
            v-bind:type="'embeds'"/></th>
        <th>Is Dev
          <Sort 
            v-bind:sortBy="'isDev'"
            v-bind:type="'embeds'"/></th>
      </thead>
      <tbody>
        <tr
          v-for="embed in embeds"
          v-bind:key="embed.id"
          v-bind:embed="embed">
          <td>{{ embed.ID }}</td>
          <td><a :href="embed.url" class="embed__link">{{ embed.url }}</a></td>
          <td>{{ embed.views }}</td>
          <td>{{ embed.siteID }}</td>
          <td>{{ embed.quizID }}</td>
          <td>{{ embed.createdAt }}</td>
          <td>{{ embed.updatedAt }}</td>
          <td>{{ embed.isDev }}</td>
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
  name: "EmbedPreview",
  props: {
    embeds: Array,
    loading: Boolean
  },
  components: {
    Loader,
    Sort
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_table.scss";
</style>
