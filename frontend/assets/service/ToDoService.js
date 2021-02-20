import ToDo from '~/assets/data/ToDo.class'

export default class ToDoApi {
  constructor ($axios) {
    this.axios = $axios
  }

  findAll () {
    return this.axios({
      method: 'get',
      url: 'todo',
      withCredentials: true
    }).then((response) => {
      const todos = []
      response.data.forEach((todo) => {
        todos.push(new ToDo(todo.id, todo.title, todo.completed))
      })
      return todos
    })
  }

  create (title) {
    return this.axios({
      method: 'post',
      url: 'todo',
      data: {
        title,
        completed: false
      },
      withCredentials: true
    }).then((response) => {
      return response.data
    })
  }

  complete (todo) {
    return this.axios({
      method: 'put',
      url: 'todo/' + todo.id,
      data: {
        id: todo.id,
        title: todo.title,
        completed: true
      },
      withCredentials: true
    }).then((response) => {
      return response.data
    })
  }

  deleteItem (id) {
    return this.axios({
      method: 'delete',
      url: 'todo/' + id,
      withCredentials: true
    })
  }
}
