<template>
  <div class="domain-info">
      <h2 class="domain__title"><a :href="domain.url">{{ domain.name }}</a></h2>
      <table>
        <tbody>
          <tr>
            <th>Views</th>
            <td>{{ domain.views }}</td>
          </tr>
          <tr>
            <th>Sites</th>
            <td>{{ domain.sites }}</td>
          </tr>
          <tr>
            <th>Quizzes</th>
            <td>{{ domain.quizzes }}</td>
          </tr>
          <tr>
            <th>Embeds</th>
            <td>{{ domain.embeds }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: "SiteInfo",
  props: {
    domain: Object
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

.domain__title {
  margin-bottom: 20px;
}

</style>
