import React from "react";
import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const [name, setName] = React.useState('')
  const [description , setDescription ] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, props.isOpen])

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name,
      about: description
    })
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      textBtn={'Сохранить'}
    >   
      <h2 className="form-change__title">Редактировать профиль</h2>
      <fieldset className="form-change__input-text">
        <input id="name-input" type="text" className="form-change__text edit-profile__text-name" value={name || ''} onChange={handleChangeName} minLength="2" maxLength="40" required name='name' placeholder="Введите своё имя" />
        <span className="form-change__input-error name-input-error"></span>
        <input id="job-input" type="text" className="form-change__text edit-profile__text-job" value={description || ''} onChange={handleChangeDescription} minLength="2" maxLength="200" required  name='about' placeholder="Кем вы работаете?" />
        <span className="form-change__input-error job-input-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup