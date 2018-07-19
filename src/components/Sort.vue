<template>
  <span class="order-wrap">
    <button class="btn--icon up" v-on:click="sort('asc')"><svg class="icon-up"><use xlink:href="#icon-up"></use></svg></button>
    <button class="btn--icon down" v-on:click="sort('desc')"><svg class="icon-down"><use xlink:href="#icon-down"></use></svg></button>
  </span>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import QuizTotals from "@/components/QuizTotals.vue";

export default {
  name: "home",
  props: {
    type: String,
    sortBy: String
  },
  methods: {
    sort: function(order) {
      this.$store.dispatch('sort', {
        type: this.type, 
        sortBy: this.sortBy, 
        order: order
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
