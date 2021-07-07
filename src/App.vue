<template>
  <div id="app">
    <todo-header></todo-header>
    <search @searchTodo="searchTodo"></search>
    <todo-list :data="data" @removeTodo="removeTodo"></todo-list>
    <add-todo @addTodo="addTodo"></add-todo>
    <pagination :paging="currentPaging" @goPage="goPage"></pagination>
  </div>
</template>

<script>
import AddTodo from './components/AddTodo.vue'
import TodoHeader from './components/TodoHeader.vue'
import TodoList from './components/TodoList.vue'
import Search from './components/Search.vue'
import Pagination from './components/Pagination.vue'

export default {
  name: 'App',
  data() {
    return {
      data: [],
      currentPaging: {},
      page: {
        page: 1,
        size: 5,
      },
      schParams: {},
      condition: {},
      dataInitFlag: false,
    }
  },
  watch: {
    condition() {
      this.dataInitFlag = true;
    }
  },
  methods: {
    addTodo(content) {
      this.$axios.post('http://localhost:8081/api/todo', {
        content: content
      }, { headers: {
        'Content-Type': 'application/json'
      }}).then(res => {
        this.data.push(res.data);
      }).catch(err => {
        console.log(err);
      })
    },
    removeTodo(todoIdx) {
      this.$axios.delete('http://localhost:8081/api/todo/' + todoIdx)
      .then(() => {
        const idx = this.$_.findIndex(this.data, item => item.idx == todoIdx)
        this.data.splice(idx, 1);
      }).catch(err => {
        console.log(err);
      })
    },
    fetchTodoList(condition) {
      let params = Object.assign(this.schParams, condition, this.page);
      this.$axios.get('http://localhost:8081/api/todo', {params})
      .then(res => {
        if (res.data.count < 1) {
          alert('검색결과가 없습니다.');
          return;
        } else {
          this.currentPaging = res.data;
          this.data.splice(0);
          for (const item of res.data.item) {
            this.data.push(item);
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    searchTodo(condition) {
      this.schParams = {};
      this.condition = {};
      Object.assign(this.condition, condition);
      this.fetchTodoList(condition);
    },
    goPage(pageIdx) {
      this.page.page = pageIdx;
      this.fetchTodoList();
    }
  },
  created() {
      this.fetchTodoList();
  },
  components: {
    AddTodo,
    TodoList,
    TodoHeader,
    Search,
    Pagination
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  text-align: center; background-color: #F6F6F8;
}

input {
    border-style: groove;
    width: 200px;
}
button {
    border-style: groove;
}
.shadow {
    box-shadow: 5px 10px 10px rgba(0,0,0,0.03)
}
</style>
