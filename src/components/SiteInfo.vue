<template>
  <div class="site-info">
      <h2 class="site__title"><a :href="site.url">{{ site.name }}</a></h2>
      <table>
        <tbody>
          <tr>
            <th>Views</th>
            <td>{{ site.views }}</td>
          </tr>
          <tr>
            <th>Quizzes</th>
            <td>{{ site.quizzes }}</td>
          </tr>
          <tr>
            <th>Embeds</th>
            <td>{{ site.embeds }}</td>
          </tr>
          <tr>
            <th>Is Dev</th>
            <td>{{ site.isDev }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: "SiteInfo",
  props: {
    site: Object
  },
  created() {
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_table.scss";

.site__title {
  margin-bottom: 20px;
}

</style>
