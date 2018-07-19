<template>
  <div class="embed-totals">
    <h3>Embed Totals</h3>
    <table>
      <tbody>
        <tr>
          <th>Production Embeds</th>
          <td>{{ nonDevEmbeds.length }}</td>
        </tr>
        <tr v-if="embeds.length - nonDevEmbeds.length">
          <th>Dev Embeds</th>
          <td>{{ embeds.length - nonDevEmbeds.length}}</td>
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
  name: "EmbedTotals",
  props: {
    embeds: Array,
    title: String
  },
  methods: {
    
  },
  computed: {
    nonDevEmbeds: function() {
      return this.embeds.filter(function(embed) {
        return embed.isDev == 0
      })
    },
    embedsTotal: function() {
      let total = 0
      for(let i =0; i < this.embeds.length; i++) {
        total += this.embeds[i].embeds.length
      }
      return total;
    },
    uniqueQuizTotal: function() {
      let uniqueQuizzes = [],
          quizID;

      for(let i =0; i < this.embeds.length; i++) {
        quizID = this.embeds[i].quizID
        if(!uniqueQuizzes.includes(quizID)) {
          uniqueQuizzes.push(quizID)
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
