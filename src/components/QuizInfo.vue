<template>
  <div class="quiz-info">
    <h2 class="quiz__title"><a :href="'https://mediaengagement.org/quiz-embed/'+quiz.ID" class="quiz__link">{{ quiz.title }}</a></h2>
    <table class="quizzes__table">
      </thead>
      <tbody>
        <tr>
          <th>ID</th>
          <td>{{ quiz.ID }}</td>
        </tr>
        <tr>
          <th>Title</th>
          <td><a :href="'https://mediaengagement.org/quiz-embed/'+quiz.ID" class="quiz__link">{{ quiz.title }}</a></td>
        </tr>
        <tr>
          <th>Status</th>
          <td>{{ quiz.status }}</td>
        </tr>
        <tr>
          <th>Questions</th>
          <td>{{ quiz.questions }}</td>
        </tr>
        <tr>
          <th>Views </th>
          <td>{{ quiz.views }}</td>
        </tr>
        <tr>
          <th>Starts</th>
          <td>{{ quiz.starts }} | {{ quiz.startPercentage }}%</td>
        </tr>
        <tr>
          <th>Finishes</th>
          <td>{{ quiz.finishes }} | {{ quiz.finishPercentage }}%</td>
        </tr>
        <tr>
          <th>Created At</th>
          <td>{{ quiz.createdAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "QuizInfo",
  props: {
    quiz: Object
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

.quiz__title {
  margin-bottom: 20px;
}
</style>
