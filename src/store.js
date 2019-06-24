import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

const server = Axios.create({
  baseURL:
    (/(?:localhost:8080|.+\.test)/.test(
      window.location.host
    ) === false
      ? "https://mediaengagement.org"
      : "https://quiz.test") + "/wp-json",
  timeout: 10000
});

export default new Vuex.Store({
  state: {
    server: server,
    loading: true,
    fetching: false,
    error: false,
    domains: [],
    sites: [],
    quizzes: [],
    totals: [],
    embeds: []
  },
  mutations: {
    setError: function(state, val) {
      state.error = val
    },
    setLoading: function(state, val) {
      state.loading = val
    },
    setFetching: function(state, val) {
      state.fetching = val
    },
    setDomains: function(state, domains) {
      console.log("domains set")
      state.domains = domains
    },
    setEmbeds: function(state, embeds) {
      console.log("embeds set")
      state.embeds = embeds
    },
    setQuizzes: function(state, quizzes) {
      console.log("quizzes set")
      state.quizzes = quizzes
    },
    setSites: function(state, sites) {
      console.log("sites set")
      state.sites = sites
    },
    setTotals: function(state, totals) {
      console.log("totals set")
      state.totals = totals
    }
  },
  getters: {
    loading: state => state.loading,
    fetching: state => state.fetching,
    error: state => state.error,
    server: state => state.server,
    totals: state => state.totals,
    domains: state => state.domains,
    quizzes: state => state.quizzes,
    quizIndexBy: (state, getters) => (name, val) => {
      return getters.indexBy(getters.quizzes, name, val);
    },
    getQuiz: (state, getters) => ID => {
      return getters.quizzes[getters.quizIndexBy('ID', ID)];
    },
    quizIndexBy: (state, getters) => (name, val) => {
      return getters.indexBy(getters.quizzes, name, val);
    },
    getQuizSites: (state, getters) => (quizID) => {
      let quizSites = []
      let sites = getters.sites
      quizID = parseInt(quizID)

      for(let i = 0; i < sites.length; i++) {
        if(sites[i].quizIDs.includes(quizID)) {
          quizSites.push(sites[i])
        }
      } 
      return quizSites;
    },
    getQuizEmbeds: (state, getters) => (quizID) => {
      let quizEmbeds = []
      let embeds = getters.embeds
      for(let i = 0; i < embeds.length; i++) {
        if(embeds[i].quizID == quizID) {
          quizEmbeds.push(embeds[i])
        }
      } 
      return quizEmbeds;
    },
    publishedQuizzes: (state, getters) => {
      return getters.quizzes.filter(function(quiz) {
        return quiz.status === 'published'
      })
    },
    /*
      How to use the filter:
        filters = {
          search: {
            val: '',
            keys: [''] // keys you want to search on
          },
          keys: [
            {
              key: 'isDev',
              val: 0,
              operator: '=='
            }
          ]
        }
       */ 
    filter: (state, getters) => (objArray, filters) => {
      let filtered = objArray 

      if(filtered.length == 0) {
        // nothing to filter here
        return filtered
      }
      
      filtered = getters.search(filtered, filters.search)

      for(let prop in filters.keys) {
        if(filters.keys[prop].type === 'length') {
          filtered = getters.runLengthFilter(filtered, prop, filters.keys[prop])
        } else {
          filtered = getters.runFilter(filtered, prop, filters.keys[prop])
        }
      }

      return filtered
    },
    runFilter: (state, getters) => (objArray, prop, filter) => {
      if(filter.val == '' || filter.val == null || filter.val == undefined) {
        return objArray
      }
      
      return objArray.filter(function(obj) {
        if(filter.operator == '==') {
          if(obj[prop] == filter.val) return true
        }
        else if(filter.operator == '!=') {
          if(obj[prop] != filter.val) return true
        }
        else if(filter.operator == '>=') {
          if(filter.val >= obj[prop]) return true
        }
        else if(filter.operator == '<=') {
          if(filter.val <= obj[prop]) return true
        }
        return false
      })
    },
    search: (state, getters) => (objArray, search) => {
      let filtered = objArray
      if (search.val == "") {
        return filtered
      }
      for(let i = 0; i < search.keys.length; i++) {
        filtered = objArray.filter(function(obj) {
          if(obj[search.keys[i]].toUpperCase().includes(search.val.toUpperCase())) {
            return true;
          }
        })
      }
      return filtered
    },
    filterQuizzes: (state, getters) => search => {
      // if it's empty return all quizzes
      if (search == "") {
        return getters.quizzes;
      }

      return getters.quizzes.filter(function(quiz) {
        if(quiz.title.toUpperCase().includes(search.toUpperCase())) {
          return true;
        }
        if(quiz.ID.toUpperCase().includes(search.toUpperCase())) {
          return true;
        }
      });
    },
    quizTotal: (state, getters) => name => {
      let total = 0;
      for(let i = 0; i < getters.quizzes.length; i++) {
        total += getters.quizzes[i][name]
      }
      return total;
    },
    quizPercentage: (state, getters) => name => {
      let percentage = 0;
      return +(((getters.quizTotal(name)/getters.quizTotal('views')) * 100).toFixed(2))
    },
    getDomain: (state, getters) => ID => {
      return getters.domains[getters.domainIndexBy('ID', ID)];
    },
    getDomainQuizzes: (state, getters) => (domainID) => {
      let quizzes = []
      let domain = getters.getDomain(domainID)
      for(let i = 0; i < domain.quizIDs.length; i++) {
        quizzes.push(getters.getQuiz(domain.quizIDs[i]))
      } 
      return quizzes;
    },
    getDomainEmbeds: (state, getters) => (domainID) => {
      let embeds = []
      let domain = getters.getDomain(domainID)
      for(let i = 0; i < domain.embedIDs.length; i++) {
        embeds.push(getters.embed(domain.embedIDs[i]))
      } 
      return embeds;
    },
    getDomainSites: (state, getters) => (domainID) => {
      let sites = []
      let domain = getters.getDomain(domainID)
      for(let i = 0; i < domain.siteIDs.length; i++) {
        sites.push(getters.getSite(domain.siteIDs[i]))
      } 
      return sites;
    },
    domainIndexBy: (state, getters) => (name, val) => {
      return getters.indexBy(getters.domains, name, val);
    },
    sites: state => state.sites,
    getSite: (state, getters) => ID => {
      return getters.sites[getters.siteIndexBy('ID', ID)];
    },
    siteIndexBy: (state, getters) => (name, val) => {
      return getters.indexBy(getters.sites, name, val);
    },
    nonDevSites: (state, getters) => {
      return  getters.sites.filter(function(site) {
        return site.isDev.includes('0')
      })
    },
    getSiteQuizzes: (state, getters) => (siteID) => {
      let quizzes = []
      let site = getters.getSite(siteID)
      for(let i = 0; i < site.quizIDs.length; i++) {
        quizzes.push(getters.getQuiz(site.quizIDs[i]))
      } 
      return quizzes;
    },
    getSiteEmbeds: (state, getters) => (siteID) => {
      let embeds = []
      let site = getters.getSite(siteID)
      for(let i = 0; i < site.embedIDs.length; i++) {
        embeds.push(getters.embed(site.embedIDs[i]))
      } 
      return embeds;
    },
    embeds: state => state.embeds,
    embedIndexBy: (state, getters) => (name, val) => {
      return getters.indexBy(state.embeds, name, val);
    },
    embed: (state, getters) => ID => {
      return state.embeds[getters.embedIndexBy('ID', ID)];
    },
    /**
     * Powers most all of the retrieval of data from the tree
     * Searches an array for a key that equals a certain value
     *
     * @param objArray (ARRAY of OBJECTS)
     * @param name (STRING) of the key you're wanting to find the matching value of
     * @param value (MIXED) the value you want to find a match for
     * @return INT of the index that matches or UNDEFINED if not found
     */
    indexBy: () => (objArray, name, value) => {
      for (let i = 0; i < objArray.length; i++) {
        if (objArray[i][name] == value) {
          return i;
        }
      }
      return undefined;
    }
  },
  actions: {
    error(context, val) {
      context.commit("setError", val);
    },
    loading(context, val) {
      context.commit("setLoading", val);
    },
    fetching(context, val) {
      context.commit("setFetching", val);
    },
    sitePosts(context, val) {
      context.commit("setSitePosts", val);
    },
    fetchAllData(context) {
      
      return context.dispatch("fetchSites")
      .then(() => context.dispatch("fetchQuizzes"))
      .then(() => context.dispatch("fetchEmbeds"))
      .then(() => context.dispatch("fetchDomains"))
      .then(() => context.dispatch("fetchTotals"))
              
      
    },
    fetchDomains(context) {
      console.log("fetching domains");
      context.dispatch("fetching", true);

      return context.getters
        .server("/enp-quiz/v1/domains")
        .then(response => {
          console.log("fetched domains");
          let enp_domains = response.data;
          let domains = [];

          for (var i = 0; i < enp_domains.length; i++) {
            // remap the domains
            domains[i] = {
              ID: enp_domains[i].embed_domain_id,
              name: enp_domains[i].embed_domain_name,
              url: enp_domains[i].embed_domain_url,
              owner: enp_domains[i].embed_domain_type_ids,
              siteIDs: enp_domains[i].embed_domain_site_ids,
              sites: enp_domains[i].embed_domain_site_ids.length,
              embedIDs: [],
              embeds: 0,
              quizIDs: [],
              quizzes: 0,
              views: 0,
              createdAt: enp_domains[i].embed_domain_created_at,
              updatedAt: enp_domains[i].embed_domain_updated_at
            }

            for (var j = 0; j < domains[i].siteIDs.length; j++) {

              // set the info off of the sites data
              // find the site
              let site = context.getters.getSite(domains[i].siteIDs[j])
              
              domains[i].quizIDs = site.quizIDs
              // increase the total quizzes
              domains[i].quizzes += site.quizzes

              domains[i].embedIDs = site.embedIDs
              // increase the total embeds
              domains[i].embeds += site.embeds

              // increase the total view counts
              domains[i].views += site.views
              
            }

          }

          context.commit("setDomains", domains);

          // Sort them by created at
          context.dispatch("sort", {type: 'domains', sortBy: 'createdAt', order: 'asc'})

        })
        .catch(error => {
          console.error(error);
          context.dispatch("error", true);
        })
        .finally(() => {
          context.dispatch("fetching", false);
        });
    },
    fetchEmbeds(context) {
      console.log("fetching embeds");
      context.dispatch("fetching", true);

      return context.getters
        .server("/enp-quiz/v1/embeds")
        .then(response => {
          console.log("fetched embeds");
          let enp_embeds = response.data;
          let embeds = [];
          let sites = context.getters.sites
          let siteIndex;

          for (var i = 0; i < enp_embeds.length; i++) {
            // remap the embeds
            embeds[i] = {
              ID: parseInt(enp_embeds[i].embed_quiz_id),
              quizID: parseInt(enp_embeds[i].quiz_id),
              siteID: parseInt(enp_embeds[i].embed_site_id),
              url: enp_embeds[i].embed_quiz_url,
              views: parseInt(enp_embeds[i].embed_quiz_loads),
              createdAt: enp_embeds[i].embed_quiz_created_at,
              updatedAt: enp_embeds[i].embed_quiz_updated_at,
              isDev: enp_embeds[i].embed_quiz_is_dev
            }
            // find the site
            siteIndex = context.getters.siteIndexBy('ID', embeds[i].siteID)
            // is this quiz in the site quizzes array already?
            if(!sites[siteIndex].quizIDs.includes(embeds[i].quizID)) {
              sites[siteIndex].quizIDs.push(embeds[i].quizID)
            }

            // increase the total view counts
            sites[siteIndex].views += embeds[i].views
            // set the total quizzes
            sites[siteIndex].quizzes = sites[siteIndex].quizIDs.length
          }
          context.commit("setEmbeds", embeds)
          context.commit("setSites", sites)
        })
        .catch(error => {
          console.error(error);
          context.dispatch("error", true);
        })
        .finally(() => {
          context.dispatch("fetching", false);
        });
    },
    fetchQuizzes(context) {
      console.log("fetching quizzes");
      context.dispatch("fetching", true);

      return context.getters
        .server("/enp-quiz/v1/quizzes")
        .then(response => {
          console.log("fetched quizzes");
          let enp_quizzes = response.data
          let quizzes = []
          for (var i = 0; i < enp_quizzes.length; i++) {
            // remap the sites
            quizzes[i] = {
              ID: parseInt(enp_quizzes[i].quiz_id),
              title: enp_quizzes[i].quiz_title,
              status: enp_quizzes[i].quiz_status,
              owner: enp_quizzes[i].quiz_owner,
              questionIDs: enp_quizzes[i].questions,
              questions: enp_quizzes[i].questions.length,
              views: parseInt(enp_quizzes[i].quiz_views),
              starts: parseInt(enp_quizzes[i].quiz_starts),
              startPercentage: (parseInt(enp_quizzes[i].quiz_starts) != 0 ? +(((enp_quizzes[i].quiz_starts)/enp_quizzes[i].quiz_views) * 100).toFixed(2) : 0),
              finishes: parseInt(enp_quizzes[i].quiz_finishes),
              finishPercentage: (parseInt(enp_quizzes[i].quiz_finishes) != 0 ? +(((enp_quizzes[i].quiz_finishes)/enp_quizzes[i].quiz_views) * 100).toFixed(2) : 0),
              average: enp_quizzes[i].quiz_score_average,
              createdAt: enp_quizzes[i].quiz_created_at,
              // place for scores and other data on individual quiz view
              scores: undefined
            }
          }
          context.commit("setQuizzes", quizzes);
        })
        .catch(error => {
          console.error(error);
          context.dispatch("error", true);
        })
        .finally(() => {
          context.dispatch("fetching", false);
        });
    },
    fetchSites(context) {
      console.log("fetching sites");
      context.dispatch("fetching", true);

      return context.getters
        .server("/enp-quiz/v1/sites")
        .then(response => {
          console.log("fetched sites");
          let enp_sites = response.data;
          let sites = [];

          for (var i = 0; i < enp_sites.length; i++) {
            // remap the sites
            sites[i] = {
              ID: parseInt(enp_sites[i].embed_site_id),
              name: enp_sites[i].embed_site_name,
              url: enp_sites[i].embed_site_url,
              owner: enp_sites[i].embed_site_type_ids,
              embedIDs: enp_sites[i].embed_site_quiz_ids,
              embeds: enp_sites[i].embed_site_quiz_ids.length,
              quizIDs: [],
              quizzes: 0,
              views: 0,
              createdAt: enp_sites[i].embed_site_created_at,
              updatedAt: enp_sites[i].embed_site_updated_at,
              isDev: enp_sites[i].embed_site_is_dev
            }
          }

          context.commit("setSites", sites);
        })
        .catch(error => {
          console.error(error);
          context.dispatch("error", true);
        })
        .finally(() => {
          context.dispatch("fetching", false);
        });
    },
    fetchTotals(context) {
      console.log("fetching totals");
      context.dispatch("fetching", true);

      return context.getters
        .server("/enp-quiz/v1/totals")
        .then(response => {
          console.log("fetched totals");
          let totals = response.data
          totals.responses.correctPercentage = +(((totals.responses.correct/totals.responses.total) * 100).toFixed(2))
          totals.responses.incorrectPercentage = +(((totals.responses.incorrect/totals.responses.total) * 100).toFixed(2))
          context.commit("setTotals", totals);
        })
        .catch(error => {
          console.error(error);
          context.dispatch("error", true);
        })
        .finally(() => {
          context.dispatch("fetching", false);
        });
    },
    sort: function(context, val) {
      // val.type should be something like 'quizzes' or 'sites'
      let vals = context.getters[val.type],
          setter,
          order = val.order,
          sortBy = val.sortBy

      vals = vals.sort(
              (a, b) => {
                if (!a.hasOwnProperty(sortBy) || !b.hasOwnProperty(sortBy)) {
                  // property doesn't exist on either object
                  return 0;
                }

                const varA = typeof a[sortBy] === "string" ? a[sortBy].toUpperCase() : a[sortBy];
                const varB = typeof b[sortBy] === "string" ? b[sortBy].toUpperCase() : b[sortBy];

                let comparison = 0;
                if (varA > varB) {
                  comparison = 1;
                } else if (varA < varB) {
                  comparison = -1;
                }
                return order == "desc" ? comparison * -1 : comparison;
              }
            )
      setter = 'set' + val.type.charAt(0).toUpperCase() + val.type.substr(1)
      
      context.commit(setter, vals)
    },
    compareValues: function(context, vals) {
      
    }
  }
});
