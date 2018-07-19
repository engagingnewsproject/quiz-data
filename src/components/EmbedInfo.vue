<template>
  <div class="click-info">
      <table>
        <thead>
          <th>Quiz
            <span class="order-wrap"><button class="btn--icon up" v-on:click="sortClicksBy('quiz', 'asc')"><svg class="icon-up"><use xlink:href="#icon-up"></use></svg></button><button class="btn--icon down" v-on:click="sortClicksBy('quiz', 'desc')"><svg class="icon-down"><use xlink:href="#icon-down"></use></svg></button></span>
          </th>
          <th>Post Type
            <span class="order-wrap"><button class="btn--icon up" v-on:click="sortClicksBy('post_type', 'asc')"><svg class="icon-up"><use xlink:href="#icon-up"></use></svg></button><button class="btn--icon down" v-on:click="sortClicksBy('post_type', 'desc')"><svg class="icon-down"><use xlink:href="#icon-down"></use></svg></button></span>
          </th>
          <th>Clicks
            <span class="order-wrap"><button class="btn--icon up" v-on:click="sortClicksBy('clicks', 'asc')"><svg class="icon-up"><use xlink:href="#icon-up"></use></svg></button><button class="btn--icon down" v-on:click="sortClicksBy('clicks', 'desc')"><svg class="icon-down"><use xlink:href="#icon-down"></use></svg></button></span>
          </th>
          <th>Updated
            <span class="order-wrap"><button class="btn--icon up" v-on:click="sortClicksBy('updated', 'asc')"><svg class="icon-up"><use xlink:href="#icon-up"></use></svg></button><button class="btn--icon down" v-on:click="sortClicksBy('updated', 'desc')"><svg class="icon-down"><use xlink:href="#icon-down"></use></svg></button></span>
          </th>
          <th>URL
            <span class="order-wrap"><button class="btn--icon up" v-on:click="sortClicksBy('quiz_url', 'asc')"><svg class="icon-up"><use xlink:href="#icon-up"></use></svg></button><button class="btn--icon down" v-on:click="sortClicksBy('quiz_url', 'desc')"><svg class="icon-down"><use xlink:href="#icon-down"></use></svg></button></span>
          </th>
        </thead>
        <tbody>
          <tr 
            v-for="click in clicks">
            <td>{{ click.quiz }}</td>
            <td>{{ click.post_type }}</td>
            <td>{{ click.clicks }}</td>
            <td>{{ click.updated }}</td>
            <td class="td__url"><a :href="click.quiz_url">{{ click.quiz_url }}</a></td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { sort } from './mixins/sort'

export default {
  name: "ClickInfo",
  props: {
    clicks: Array,
    sortBy: Object
  },
  // mixins: [sort],
  created() {
    // resort based on the applied field
    // if we have clicks, sort them
    if (this.clicks) {
      this.sortClicks(this.sortBy.field, this.sortBy.order);
    }
  },
  methods: {
    sortClicksBy: function(field, order) {
      // don't run the sort if it's what we're already sorted by
      if (this.sortBy.field !== field || this.sortBy.order !== order) {
        this.sortClicks(field, order);
      }
    },
    sortClicks: function(field, order) {
      this.clicks.sort(this.compareValues(field, order));
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
  },
  computed: {
    ...mapGetters(["loading", "error"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_table.scss";

.click-info {
  padding: 2rem;
  background: #fff;
}
</style>
