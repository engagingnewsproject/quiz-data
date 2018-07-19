<template>
  <div class="quiz">
    <h3>Quizzes</h3>
    <p>{{ quizzes.length}} Found</p>
    <table class="quizzes__table">
      <thead>
        <th>ID
          <Sort 
              v-bind:sortBy="'ID'"
              v-bind:type="'quizzes'"/></th>
        <th>Title
          <Sort 
              v-bind:sortBy="'title'"
              v-bind:type="'quizzes'"/></th>
        <th>Status
          <Sort 
              v-bind:sortBy="'status'"
              v-bind:type="'quizzes'"/></th>
        <th>Questions
          <Sort 
              v-bind:sortBy="'questions'"
              v-bind:type="'quizzes'"/></th>
        <th>Views 
            <Sort 
              v-bind:sortBy="'views'"
              v-bind:type="'quizzes'"/></th>
        <th>Starts
          <Sort 
              v-bind:sortBy="'starts'"
              v-bind:type="'quizzes'"/></th>
        <th>Start %
          <Sort 
              v-bind:sortBy="'startPercentage'"
              v-bind:type="'quizzes'"/></th>
        <th>Finishes
          <Sort 
              v-bind:sortBy="'finishes'"
              v-bind:type="'quizzes'"/></th>
        <th>Finish %
            <Sort 
              v-bind:sortBy="'finishPercentage'"
              v-bind:type="'quizzes'"/></th>
        <th>Date Added
          <Sort 
              v-bind:sortBy="'createdAt'"
              v-bind:type="'quizzes'"/></th>
      </thead>
      <tbody>
        <tr
          v-for="quiz in quizzes"
          v-bind:key="quiz.id"
          v-bind:quiz="quiz">
          <td>{{ quiz.ID }}</td>
          <td><a :href="'https://mediaengagement.org/quiz-embed/'+quiz.ID" class="quiz__link">{{ quiz.title }}</a></td>
          <td>{{ quiz.status }}</td>
          <td>{{ quiz.questions }}</td>
          <td>{{ quiz.views }}</td>
          <td>{{ quiz.starts }}</td>
          <td>{{ quiz.startPercentage }}%</td>
          <td>{{ quiz.finishes }}</td>
          <td>{{ quiz.finishPercentage }}%</td>
          <td>{{ quiz.createdAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
    
  </div>
</template>

<script>
import Sort from "@/components/Sort.vue";

export default {
  name: "QuizData",
  components: {
    Sort
  },
  props: {
    quizzes: Array
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_table.scss";

</style>
