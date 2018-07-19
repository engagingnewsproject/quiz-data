<template>
  <div class="quiz-info">
      <h2 class="quiz__name">{{ quiz.name }}</h2>
      <table>
        <thead>
          <th>URL
            <span class="order-wrap"><button class="btn--icon up" v-on:click="sortQuizzesBy('quiz_url', 'asc')"><svg class="icon-up"><use xlink:href="#icon-up"></use></svg></button><button class="btn--icon down" v-on:click="sortQuizzesBy('quiz_url', 'desc')"><svg class="icon-down"><use xlink:href="#icon-down"></use></svg></button></span>
          </th>
          <th>Post Type 
            <span class="order-wrap"><button class="btn--icon up" v-on:click="sortQuizzesBy('post_type', 'asc')"><svg class="icon-up"><use xlink:href="#icon-up"></use></svg></button><button class="btn--icon down" v-on:click="sortQuizzesBy('post_type', 'desc')"><svg class="icon-down"><use xlink:href="#icon-down"></use></svg></button></span>
          </th>
          <th>Date 
            <span class="order-wrap"><button class="btn--icon up" v-on:click="sortQuizzesBy('date', 'asc')"><svg class="icon-up"><use xlink:href="#icon-up"></use></svg></button><button class="btn--icon down" v-on:click="sortQuizzesBy('date', 'desc')"><svg class="icon-down"><use xlink:href="#icon-down"></use></svg></button></span></th>
        </thead>
        <tbody>
          <tr 
            v-for="click in quiz.clicks">
            <td class="td__url"><a :href="click.quiz_url">{{ click.quiz_url }}</a></td>
            <td>{{ click.post_type }}</td>
            <td>{{ click.date }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: "QuizInfo",
  props: {
    quiz: Object,
    sortBy: Object
  },
  created() {
    // if we have clicks, sort them
    if (this.quiz.clicks) {
      this.sortQuizzes(this.sortBy.field, this.sortBy.order);
    }
  },
  methods: {
    sortQuizzesBy: function(field, order) {
      // don't run the sort if it's what we're already sorted by
      if (this.sortBy.field !== field || this.sortBy.order !== order) {
        this.sortQuizzes(field, order);
      }
    },
    sortQuizzes: function(field, order) {
      this.quiz.clicks.sort(this.compareValues(field, order));
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

.quiz-info {
  padding: 2rem;
  background: #fff;
}

.quiz__name {
  margin-bottom: 20px;
}
</style>
