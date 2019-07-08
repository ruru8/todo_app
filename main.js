// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    todos: [],
  },
  methods: {
    // todoを追加
    addTodo: function(event, value) {
      var content = this.$refs.content
      if (!content.value.length) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: content.value,
        status: '進行中'
      })
      // フォームを空に
     content.value = ''
    },
    
    // todoを削除
    removeTodo: function(todo) {
      var index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
    },
    
    // 状態変更
    changeTodoStatus: function(todo) {
      if (todo.status == '進行中') {
        todo.status = '完了'
      } else {
        todo.status = '進行中'
      }
    },
  },
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },
  created() {
    this.todos = todoStorage.fetch()
  },
})
