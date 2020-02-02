<template>
  <div class="table">
    <div class="header">
      <h2>List Quotes</h2>
      <div class="input-wrapper">
        <input
          v-model="search"
          @keydown.enter="handleSearch"
          type="text"
          name="search"
          placeholder="Search here"
        />
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Quote</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" v-bind:key="item._id">
          <td>{{ item.text }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.created | formatDate }}</td>
        </tr>
      </tbody>
    </table>
    <div class="footer">
      <div class="total">
        <p>{{(page - 1) * limit + 1}} - {{page * limit}} of {{ total }}</p>
      </div>
      <div class="limit">
        <div class="limit-desc">
          <p>Per page:</p>
          <select v-model="limitSelected" @change="handleLimitChanged">
            <option v-for="val in limitOptions" :key="val">{{val}}</option>
          </select>
          <p>{{ 'halo' | capitalize }}</p>
        </div>
      </div>
      <div class="pagination">
        <!-- <a class="arrow">◀️</a>
        <a class="arrow">▶️</a>-->
        <a class="arrow" v-on:click.stop.prevent="$emit('on-prev')">&#8249;</a>
        <a class="arrow" v-on:click.stop.prevent="$emit('on-next')">&#8250;</a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "custom-table",
  props: {
    data: Array,
    total: Number,
    lastPage: Boolean,
    page: Number,
    limit: Number,
    limitOptions: Array
  },
  data() {
    return {
      limitSelected: this.limit,
      search: ""
    };
  },
  methods: {
    handleLimitChanged() {
      this.$emit("on-limit-changed", this.limitSelected);
    },
    handleSearch(/* event */) {
      //   if (event.keyCode === 13 /* kode tombol enter */) {
      // TODO: lempar parent nilainya
      // let value = event.target.value;
      this.$emit("on-search", this.search);
      //   }
    }
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    formatDate(value) {
      return moment(value).format("YYYY-MM-DD");
    }
  }
};
</script>

<style scoped>
div.table {
  border: 1px solid #dddddd;
  border-radius: 4px;
  box-shadow: 1px 1px #dddddd;
}
.header {
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.input-wrapper {
  flex: 1;
  text-align: right;
}

input {
  padding: 8px;
  outline: none;
  border-radius: 5px;
  border: 1px solid #dddddd;
}

.footer {
  display: flex;
  align-items: center;
}

.total {
  margin-right: 6px;
  margin-left: 6px;
  text-align: left;
  /* flex: 3; */
}

.total p {
  font-weight: bold;
}

.limit {
  flex: 2;
}

.limit-desc {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 5px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  /* margin-right: 0.5rem; */
  padding: 0 1.5rem 0;
  height: 35px;
  margin-top: 5px;
  margin-left: 0.5rem;
  outline: none;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  flex: 1;
}

.pagination a {
  color: black;
  float: right;
  padding-top: -2px;
  padding-bottom: 2px;
  padding-left: 12px;
  padding-right: 12px;
  text-decoration: none;
  transition: background-color 0.3s;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 5px 5px 5px 0;
  font-size: 24px;
}

.pagination a:hover:not(.active) {
  background-color: #f8f6ff;
}

.arrow {
  cursor: pointer;
  margin-right: 6px;
  margin-left: 6px;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>