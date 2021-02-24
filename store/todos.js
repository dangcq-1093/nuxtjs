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
  edit(state, todo, content) {
    const index = state.todoList.findIndex(
      (todoItem) => todoItem.id === todo.id
    )
    state.todoList[index].content = content
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
        console.log(err)
      })
  },
  editTodo(vuexContext, data) {
    console.log(data)
    // return this.$axios
    //   .$put(`https://6035ea036496b9001749f8ee.mockapi.io/todos/${todo.id}`, {
    //     content,
    //   })
    //   .then(function (res, content) {
    //     console.log(content)
    //     // vuexContext.commit('edit', res, content)
    //   })
    //   .catch(function (err) {
    //     console.log(err)
    //   })
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
        console.log(err)
      })
  },
  deleteTodo(vuexContext, todo) {
    console.log(todo)
    return this.$axios
      .$delete(`https://6035ea036496b9001749f8ee.mockapi.io/todos/${todo.id}`)
      .then(function (res) {
        vuexContext.commit('remove', res)
      })
      .catch(function (err) {
        console.log(err)
      })
  },
}
