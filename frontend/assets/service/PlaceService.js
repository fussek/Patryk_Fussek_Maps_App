import Places from '~/assets/data/Place.class'

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
        places.push(new Places(place.id, place.name
          // , place.visited
        ))
      })
      return places
    })
  }

  create (name) {
    return this.axios({
      method: 'post',
      url: 'places',
      data: {
        name
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
  //       id: place.id,
  //       name: place.name,
  //       visited: true
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
