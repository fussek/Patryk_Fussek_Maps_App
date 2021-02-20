import ToDoService from '~/assets/service/ToDoService'
import LoginService from '~/assets/service/LoginService'

export default (ctx, inject) => {
  const services = {
    login: new LoginService(ctx.$axios),
    todo: new ToDoService(ctx.$axios)
  }

  inject('services', services)
}
