<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <custom-table
      :data="quotes"
      :total="count"
      :page="page"
      :lastPage="lastPage"
      :limit="limit"
      @on-next="handleNext"
      @on-prev="handlePrev"
      :limitOptions="limitOptions"
      @on-limit-changed="handleLimitChanged"
      @on-search="handleSearch"
    />
  </div>
</template>

<script>
import CustomTable from "./components/CustomTable.vue";
import request from "./service/request.js";

export default {
  name: "app",
  async created() {
    this.getQuotes();
  },
  methods: {
    async getQuotes(params = "") {
      // http://apicollections.herokuapp.com/api/quotes?page=3&limit=10
      if (this.q) {
        params += `&q=${this.q}`;
      }
      let url = `http://apicollections.herokuapp.com/api/quotes?${params}`;
      let res = await request(url);

      this.quotes = res.quotes;
      this.count = res.count;
      this.page = res.page;
      this.lastPage = res.lastPage;
      this.limit = res.limit;
    },
    hasPrevious() {
      return this.page > 1;
    },
    hasNext() {
      // return this.page * this.limit < this.count; // calculate manually
      return !this.lastPage; // from api
    },
    handleNext() {
      if (this.hasNext()) {
        let params = `page=${this.page + 1}&limit=${this.limit}`;
        this.getQuotes(params);
      }
    },
    handlePrev() {
      if (this.hasPrevious()) {
        let params = `page=${this.page - 1}&limit=${this.limit}`;
        this.getQuotes(params);
      }
    },
    handleLimitChanged(limit) {
      let params = `page=${this.page}&limit=${limit}`;
      this.getQuotes(params);
    },
    handleSearch(searchCriteria) {
      this.q = searchCriteria;
      this.getQuotes(`page=${this.page}&limit=${this.limit}`);
    }
  },
  data() {
    return {
      limit: 10,
      page: 1,
      lastPage: false,
      quotes: [],
      count: 0,
      limitOptions: [10, 15, 25, 50],
      q: ""
    };
  },
  components: {
    CustomTable
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
  margin-bottom: 60px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
</style>
