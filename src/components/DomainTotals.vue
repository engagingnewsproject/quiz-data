<template>
  <div class="site-totals">
    <h3>Domain Totals</h3>
    <table>
      <tbody>
        <tr>
          <th>Production Domains</th>
          <td>{{ domains.length }}</td>
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
  name: "DomainTotals",
  props: {
    domains: Array,
    title: String
  },
  methods: {
    
  },
  computed: {
    embedsTotal: function() {
      let total = 0
      for(let i =0; i < this.domains.length; i++) {
        total += this.domains[i].embeds
      }
      return total;
    },
    quizTotal: function() {
      let total = 0
      for(let i =0; i < this.domains.length; i++) {
        total += this.domains[i].quizzes
      }
      return total;
    },
    uniqueQuizTotal: function() {
      let uniqueQuizzes = [],
          quizID;

      for(let i =0; i < this.domains.length; i++) {
        for(let k =0; k < this.domains[i].quizIDs.length; k++) {
          quizID = this.domains[i].quizIDs[k]
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
