// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
  el: '#app',
  data: {
    todos: [],
    content: '',
  },
  methods: {
    // todoを追加
    addTodo: function (event, value) {
      if (!this.content.length) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: this.content,
        status: 0
      })
      // フォームを空に
      this.content = ''
    },

    // todoを削除
    removeTodo: function (todo) {
      var index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
    },

    // 状態変更
    changeTodoStatus: function (todo, status) {
      status == 0 ? todo.status = 0 : todo.status = 1
    },
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },
  created() {
    this.todos = todoStorage.fetch()
  },
})
