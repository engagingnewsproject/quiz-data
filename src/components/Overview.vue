<template>
  <div class="view overview--view">
    <p class="overview-note">
      News candidates are filtered from all embed hosts using CME research rules (June 2026).
      Confirm each site before using in investor reporting.
    </p>
    <table>
      <tbody>
        <tr>
          <th>Total embed sites</th>
          <td>{{ siteListCounts.total }}</td>
        </tr>
        <tr>
          <th>Sites (Non-Dev)</th>
          <td>{{ siteListCounts.nonDev }}</td>
        </tr>
        <tr>
          <th>News candidates</th>
          <td>{{ siteListCounts.candidates }}</td>
        </tr>
        <tr>
          <th>Confirmed news</th>
          <td>{{ siteListCounts.confirmed }}</td>
        </tr>
        <tr>
          <th>Pending review</th>
          <td>{{ siteListCounts.pending }}</td>
        </tr>
        <tr>
          <th>Excluded</th>
          <td>{{ siteListCounts.excluded }}</td>
        </tr>
        <tr v-if="siteListCounts.unmatchedCandidates > 0">
          <th>Unmatched candidates</th>
          <td>{{ siteListCounts.unmatchedCandidates }}</td>
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

    <h3 v-if="hasResponseTotals">Responses</h3>
    <table v-if="hasResponseTotals">
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
  name: "Overview",
  components: {
    QuizTotals
  },
  computed: {
    hasResponseTotals: function() {
      return this.totals && this.totals.responses;
    },
    ...mapGetters([
      "nonDevSites",
      "publishedQuizzes",
      "totals",
      "siteListCounts",
      "embeds",
      "quizzes"
    ])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_table.scss";

.overview-note {
  margin-bottom: 1rem;
  max-width: 40rem;
  line-height: 1.4;
}

</style>
