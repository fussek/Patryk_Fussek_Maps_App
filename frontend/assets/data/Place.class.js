export default class Place {
  constructor (id, name, fullName, latitude, longitude, countryCode, thumbnails, visited) {
    this.id = id
    this.name = name
    this.fullName = fullName
    this.latitude = latitude
    this.longitude = longitude
    this.countryCode = countryCode
    this.thumbnails = thumbnails
    this.visited = visited
  }
}
