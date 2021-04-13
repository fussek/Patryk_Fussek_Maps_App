import ToDoService from '~/assets/service/ToDoService'
import PlaceService from '~/assets/service/PlaceService'
import LoginService from '~/assets/service/LoginService'
// import GoogleMapsPlacesService from '~/assets/service/GoogleMapsPlacesService'

export default (ctx, inject) => {
  const services = {
    login: new LoginService(ctx.$axios),
    myplaces: new ToDoService(ctx.$axios),
    places: new PlaceService(ctx.$axios)
  }

  inject('services', services)
}
