import apiSettigs from "./utils";
class AuthApi {
  constructor(apiSettigs) {
    this.BASE_URL = apiSettigs.groupId
  }

  _parseResponse(res) {
    if(res.ok) {
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
    .then(res => {
      try {
        if (res.ok === true){
          this._parseResponse(res)
        }
      } catch(err){
        return (err)
      }
    })
    .then(res => {
      return res
    })
    .catch((err) => console.log(err))
  }
}
const authApi = new AuthApi(apiSettigs)
export default authApi