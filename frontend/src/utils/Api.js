import apiSettigs from "./utils";

class Api {
  constructor({apiSettigs}) {
    this._groupId = apiSettigs.groupId;
  }
  _parseResponse(res) {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  getUserInfo() {
    console.log(localStorage.getItem('jwt'))
    return fetch(`${this._groupId}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => this._parseResponse(res))
  }
  getCardItems() {
    return fetch(`${this._groupId}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => this._parseResponse(res))
  }
  subUserInfo(data) {
    return fetch(`${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(res => this._parseResponse(res))
  }
  subCardItem(data) {
    return fetch(`${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._parseResponse(res))
  }
  
  _subCardLike(data) {
    return fetch(`${this._groupId}/cards/${data}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => this._parseResponse(res))
  }
  subAvatarPhoto(data) {
    return fetch(`${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data
      })
    }).then(res => this._parseResponse(res))
  }
  _delCardLike(data) {
    return fetch(`${this._groupId}/cards/${data}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => this._parseResponse(res))
  }
  delСardItem(data) {
    return fetch(`${this._groupId}/cards/${data}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => this._parseResponse(res))
  }
  changeLikeCardStatus(data, isLiked) {
    return isLiked ? this._subCardLike(data) : this._delCardLike(data)
  }
}

const api = new Api({apiSettigs})
export default api