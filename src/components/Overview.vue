<template>
  <div class="view overview--view">
    <table>
      <tbody>
        <tr>
          <th>Sites (Non-Dev)</th>
          <td>{{ nonDevSites.length }}</td>
        </tr>
        <tr>
          <th>Embeds</th>
          <td>{{ embeds.length }}</td>
        </tr>
      </tbody>
    </table>

    <QuizTotals 
      v-if="quizzes.length > 0" 
      v-bind:quizzes="quizzes"></QuizTotals>

    <h3>Responses</h3>
    <table>
      <tbody>
        <tr>
          <th>Total Responses</th>
          <td>{{ totals.responses.total }}</td>
        </tr>
        <tr>
          <th>Correct Responses</th>
          <td>{{ totals.responses.correct }} | {{ totals.responses.correctPercentage }}%</td>
        </tr>
        <tr>
          <th>Incorrect Responses</th>
          <td>{{ totals.responses.incorrect }} | {{ totals.responses.incorrectPercentage }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import QuizTotals from "@/components/QuizTotals.vue";

export default {
  name: "home",
  props: {
    sites: Array,
    quizzes: Array,
    embeds: Array
  },
  components: {
    QuizTotals
  },
  computed: {
    ...mapGetters(["nonDevSites", "publishedQuizzes", "totals"])
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_table.scss";

</style>
