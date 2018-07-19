<template>
  <div class="site-totals">
    <h3>Site Totals</h3>
    <table>
      <tbody>
        <tr>
          <th>Production Sites</th>
          <td>{{ nonDevSites.length }}</td>
        </tr>
        <tr v-if="sites.length - nonDevSites.length">
          <th>Dev Sites</th>
          <td>{{ sites.length - nonDevSites.length}}</td>
        </tr>
        <tr>
          <th>Embeds</th>
          <td>{{ embedsTotal }}</td>
        </tr>
        <tr>
          <th>Quizzes</th>
          <td>{{ quizTotal }}</td>
        </tr>
        <tr>
          <th>Unique Quizzes</th>
          <td>{{ uniqueQuizTotal }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SiteTotals",
  props: {
    sites: Array,
    title: String
  },
  methods: {
    
  },
  computed: {
    nonDevSites: function() {
      return this.sites.filter(function(site) {
        return site.isDev == 0
      })
    },
    embedsTotal: function() {
      let total = 0
      for(let i =0; i < this.sites.length; i++) {
        total += this.sites[i].embeds
      }
      return total;
    },
    quizTotal: function() {
      let total = 0
      for(let i =0; i < this.sites.length; i++) {
        total += this.sites[i].quizzes
      }
      return total;
    },
    uniqueQuizTotal: function() {
      let uniqueQuizzes = [],
          quizID;

      for(let i =0; i < this.sites.length; i++) {
        for(let k =0; k < this.sites[i].quizIDs.length; k++) {
          quizID = this.sites[i].quizIDs[k]
          if(!uniqueQuizzes.includes(quizID)) {
            uniqueQuizzes.push(quizID)
          }
        }
      }
      return uniqueQuizzes.length;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_table.scss";

</style>
