<template>
  <div class="quiz">
    <h3>Quiz Totals</h3>
    <table>
      <tbody>
        <tr v-if="quizzes.length - publishedQuizzes.length">
          <th>Quizzes</th>
          <td>{{ quizzes.length }}</td>
        </tr>
        <tr v-if="publishedQuizzes.length ">
          <th>Published Quizzes</th>
          <td>{{ publishedQuizzes.length }}</td>
        </tr>
        <tr v-if="quizzes.length - publishedQuizzes.length">
          <th>Draft Quizzes</th>
          <td>{{ quizzes.length - publishedQuizzes.length }}</td>
        </tr>
        <tr>
          <th>Total Views</th>
          <td>{{ quizTotal('views') }}</td>
        </tr>
        <tr>
          <th>Total Starts</th>
          <td>{{ quizTotal('starts') }}</td>
        </tr>
        <tr>
          <th>Start Percentage</th>
          <td>{{ quizPercentage('starts') }}%</td>
        </tr>
        <tr>
          <th>Total Finishes</th>
          <td>{{ quizTotal('finishes') }}</td>
        </tr>
        <tr>
          <th>Finish Percentage</th>
          <td>{{ quizPercentage('finishes') }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "QuizTotals",
  props: {
    quizzes: Array,
    title: String
  },
  methods: {
    quizTotal: function(name) {
      let total = 0;
      for(let i = 0; i < this.quizzes.length; i++) {
        total += this.quizzes[i][name]
      }
      return total;
    },
    quizPercentage: function(name) {
      let percentage = 0;
      return +(((this.quizTotal(name)/this.quizTotal('views')) * 100).toFixed(2))
    }
  },
  computed: {
    publishedQuizzes: function() {
      return this.quizzes.filter(function(quiz) {
        return quiz.status === 'published'
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_table.scss";

</style>
