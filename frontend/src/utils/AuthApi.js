import apiSettigs from "./utils";
class AuthApi {
  constructor(apiSettigs) {
    this.BASE_URL = apiSettigs.groupId

  }
  _parseResponse(res) {
    if(res.ok) {
      console.log(res)
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  postRegistorInfo(data) {
    return fetch(`${this.BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'password': data.password,
        'email': data.email
      })
    })
    .then(res => this._parseResponse(res))
  }

  postAuthorizationInfo(data) {
    return fetch(`${this.BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": data.password,
        'email': data.email
      })
    })
    .then(res => this._parseResponse(res))
  }

  getValidityToken(data) {
    return fetch(`${this.BASE_URL}/users/me`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${data}`
      }
    })
    .then(res => this._parseResponse(res))
  }
}

const authApi = new AuthApi(apiSettigs)
export default authApi