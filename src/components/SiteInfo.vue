<template>
  <div class="site-info">
      <h2 class="site__title"><a :href="site.url">{{ site.url }}</a></h2>
      <table>
        <thead>
          <th>Quiz 
            <span class="order-wrap"><button class="btn--icon up" v-on:click="sortPostsBy('quiz', 'asc')"><svg class="icon-up"><use xlink:href="#icon-up"></use></svg></button><button class="btn--icon down" v-on:click="sortPostsBy('quiz', 'desc')"><svg class="icon-down"><use xlink:href="#icon-down"></use></svg></button></span>
          </th>
          <th>Type 
            <span class="order-wrap"><button class="btn--icon up" v-on:click="sortPostsBy('post_type', 'asc')"><svg class="icon-up"><use xlink:href="#icon-up"></use></svg></button><button class="btn--icon down" v-on:click="sortPostsBy('post_type', 'desc')"><svg class="icon-down"><use xlink:href="#icon-down"></use></svg></button></span>
          </th>
          <th>Clicks 
            <span class="order-wrap"><button class="btn--icon up" v-on:click="sortPostsBy('clicks', 'asc')"><svg class="icon-up"><use xlink:href="#icon-up"></use></svg></button><button class="btn--icon down" v-on:click="sortPostsBy('clicks', 'desc')"><svg class="icon-down"><use xlink:href="#icon-down"></use></svg></button></span></th>
        </thead>
        <tbody>
          <tr 
            v-for="post in site.posts" 
            v-bind:key="post.id">
            <td><a :href="post.quiz_url">{{ post.quiz }}</a></td>
            <td>{{ post.post_type }}</td>
            <td>{{ post.clicks }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: "SiteInfo",
  props: {
    site: Object,
    sortBy: Object
  },
  created() {
    // if we have posts, sort them
    if (this.site.posts) {
      this.sortPosts(this.sortBy.field, this.sortBy.order);
    }
  },
  methods: {
    sortPostsBy: function(field, order) {
      // don't run the sort if it's what we're already sorted by
      if (this.sortBy.field !== field || this.sortBy.order !== order) {
        this.sortPosts(field, order);
      }
    },
    sortPosts: function(field, order) {
      this.site.posts.sort(this.compareValues(field, order));
      // set the new sort value
      this.sortBy.field = field;
      this.sortBy.order = order;
    },
    compareValues: function(key, order = "asc") {
      return function(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }

        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order == "desc" ? comparison * -1 : comparison;
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_table.scss";

.site-info {
  padding: 2rem;
  background: #fff;
}

.site__title {
  margin-bottom: 20px;
}

</style>
