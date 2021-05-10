import Place from '~/assets/data/Place.class'

export default class PlaceApi {
  constructor ($axios) {
    this.axios = $axios
  }

  findAll () {
    return this.axios({
      method: 'get',
      url: 'places',
      withCredentials: true
    }).then((response) => {
      const places = []
      response.data.forEach((place) => {
        places.push(new Place(
          place.id,
          place.name,
          place.fullName,
          place.latitude,
          place.longitude,
          place.countryCode,
          place.thumbnails,
          place.visited))
      })
      return places
    })
  }

  create (name, fullName, latitude, longitude, countryCode, thumbnails) {
    return this.axios({
      method: 'post',
      url: 'places',
      data: {
        name,
        fullName,
        latitude,
        longitude,
        countryCode,
        thumbnails,
        visited: false
      },
      withCredentials: true
    }).then((response) => {
      return response.data
    })
  }

  // markVisited (place) {
  //   return this.axios({
  //     method: 'put',
  //     url: 'places/' + place.id,
  //     data: {
  //     id: place.id,
  //     name: place.name,
  //     fullName: place.fullName,
  //     latitude: place.latitude,
  //     longitude: place.longitude,
  //     countryCode: place.countryCode,
  //     visited: true
  //     },
  //     withCredentials: true
  //   }).then((response) => {
  //     return response.data
  //   })
  // }

  deleteItem (id) {
    return this.axios({
      method: 'delete',
      url: 'places/' + id,
      withCredentials: true
    })
  }
}
