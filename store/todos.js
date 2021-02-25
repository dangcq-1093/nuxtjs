export const state = () => ({
  todoList: [],
})

export const getters = {
  all(state) {
    return state.todoList
  },
  progress(state) {
    return state.todoList.filter(function (item) {
      return !item.isComplete
    })
  },
  done(state) {
    return state.todoList.filter(function (item) {
      return item.isComplete
    })
  },
}

export const mutations = {
  store(state, data) {
    state.todoList = data
  },
  add(state, content) {
    state.todoList.push(content)
  },
  remove(state, todo) {
    const index = state.todoList.findIndex(
      (todoItem) => todoItem.id === todo.id
    )
    state.todoList.splice(index, 1)
  },
  toggle(state, todo) {
    const index = state.todoList.findIndex(
      (todoItem) => todoItem.id === todo.id
    )
    state.todoList[index].isComplete = todo.isComplete
  },
  edit(state, todo) {
    const index = state.todoList.findIndex(
      (todoItem) => todoItem.id === todo.id
    )
    state.todoList[index].content = todo.content
  },
}

export const actions = {
  getTodoList(vuexContext) {
    return this.$axios
      .$get('https://6035ea036496b9001749f8ee.mockapi.io/todos')
      .then((res) => {
        vuexContext.commit('store', res)
      })
  },
  addTodo(vuexContext, content) {
    return this.$axios
      .$post('https://6035ea036496b9001749f8ee.mockapi.io/todos', {
        content,
        isComplete: false,
      })
      .then(function (res) {
        vuexContext.commit('add', res)
      })
      .catch(function (err) {
        alert(err)
      })
  },
  editTodo(vuexContext, data) {
    return this.$axios
      .$put(
        `https://6035ea036496b9001749f8ee.mockapi.io/todos/${data.todo.id}`,
        {
          content: data.content,
        }
      )
      .then(function (res) {
        vuexContext.commit('edit', res)
      })
      .catch(function (err) {
        alert(err)
      })
  },
  toggleTodo(vuexContext, todo) {
    return this.$axios
      .$put(`https://6035ea036496b9001749f8ee.mockapi.io/todos/${todo.id}`, {
        isComplete: !todo.isComplete,
      })
      .then(function (res) {
        vuexContext.commit('toggle', res)
      })
      .catch(function (err) {
        alert(err)
      })
  },
  deleteTodo(vuexContext, todo) {
    return this.$axios
      .$delete(`https://6035ea036496b9001749f8ee.mockapi.io/todos/${todo.id}`)
      .then(function (res) {
        vuexContext.commit('remove', res)
      })
      .catch(function (err) {
        alert(err)
      })
  },
}
