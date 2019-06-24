import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Domains from "./views/Domains.vue";
import Domain from "./views/Domain.vue";
import Sites from "./views/Sites.vue";
import Site from "./views/Site.vue";
import Quizzes from "./views/Quizzes.vue";
import Quiz from "./views/Quiz.vue";
import Embeds from "./views/Embeds.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/domains",
      name: "domains",
      component: Domains
    },
    {
      path: "/domain/:domainID",
      name: "domain",
      component: Domain
    },
    {
      path: "/embeds",
      name: "Embeds",
      component: Embeds
    },
    {
      path: "/quizzes",
      name: "Quizzes",
      component: Quizzes
    },
    {
      path: "/quizzes/:quizID",
      name: "quiz",
      component: Quiz
    },
    {
      path: "/sites",
      name: "sites",
      component: Sites
    },
    {
      path: "/sites/:siteID",
      name: "site",
      component: Site
    },
  ]
});
