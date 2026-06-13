<template>
  <div class="embeds" v-if="loading == false">
    <h3>Embeds</h3>
    <p>
      {{ embeds.length }} found.
      <span v-if="embeds.length > pageSize">
        Showing {{ rangeStart }}–{{ rangeEnd }}.
      </span>
    </p>
    <div class="pagination" v-if="totalPages > 1">
      <button
        type="button"
        class="btn"
        v-bind:disabled="page <= 1"
        v-on:click="page = page - 1">
        Previous
      </button>
      <span class="pagination__label">Page {{ page }} of {{ totalPages }}</span>
      <button
        type="button"
        class="btn"
        v-bind:disabled="page >= totalPages"
        v-on:click="page = page + 1">
        Next
      </button>
    </div>
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
          v-for="embed in pagedEmbeds"
          v-bind:key="embed.ID">
          <td>{{ embed.ID }}</td>
          <td><a :href="embed.url" class="embed__link">{{ embed.url }}</a></td>
          <td>{{ embed.views }}</td>
          <td><router-link :to="{ name: 'site', params: { siteID: embed.siteID }}">{{ embed.siteID }}</router-link></td>
          <td><router-link :to="{ name: 'quiz', params: { quizID: embed.quizID }}">{{ embed.quizID }}</router-link></td>
          <td>{{ embed.createdAt }}</td>
          <td>{{ embed.updatedAt }}</td>
          <td>{{ embed.isDev }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination" v-if="totalPages > 1">
      <button
        type="button"
        class="btn"
        v-bind:disabled="page <= 1"
        v-on:click="page = page - 1">
        Previous
      </button>
      <span class="pagination__label">Page {{ page }} of {{ totalPages }}</span>
      <button
        type="button"
        class="btn"
        v-bind:disabled="page >= totalPages"
        v-on:click="page = page + 1">
        Next
      </button>
    </div>
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
  },
  data: function() {
    return {
      page: 1,
      pageSize: 100
    };
  },
  watch: {
    embeds: function() {
      this.page = 1;
    }
  },
  computed: {
    totalPages: function() {
      return Math.max(1, Math.ceil(this.embeds.length / this.pageSize));
    },
    rangeStart: function() {
      if (this.embeds.length === 0) return 0;
      return (this.page - 1) * this.pageSize + 1;
    },
    rangeEnd: function() {
      return Math.min(this.page * this.pageSize, this.embeds.length);
    },
    pagedEmbeds: function() {
      const start = (this.page - 1) * this.pageSize;
      return this.embeds.slice(start, start + this.pageSize);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_table.scss";

.pagination {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.75rem 0;
}

.pagination__label {
  font-size: 0.9rem;
}
</style>
