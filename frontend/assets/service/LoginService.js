export default class LoginService {
  constructor ($axios) {
    this.axios = $axios
  }

  performLogin (username, password) {
    const data = new FormData()
    data.append('username', username)
    data.append('password', password)
    return this.axios({
      method: 'post',
      url: 'login',
      data
    }).then(() => {
      return true
    }).catch(() => {
      return false
    })
  }
}
