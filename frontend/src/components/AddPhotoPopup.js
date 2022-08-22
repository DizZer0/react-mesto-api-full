import React from "react";
import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function AddPhotoPopup(props) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateCards({
      name,
      link
    })
  }
  
  React.useEffect(() => {
    setName('')
    setLink('')
  }, [props.isOpen])
  
  //Я правильно понимаю, что теперь значение инпута будет устанавливаться так: нажатие на клавишу = изменение useState = из useState получение значение инпута 
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      textBtn={'Создать'}
    >
      <h2 className="form-change__title">Новое место</h2>
      <fieldset className="form-change__input-text">
        <input id="titleInput" type="text" className="form-change__text  add-photo__text-title" value={name} onChange={handleChangeName} minLength="2" maxLength="30" required name="name" placeholder="Название" />
        <span className="form-change__input-error title-input-error">тут ошибка тут ошибка</span>
        <input id="linkInput" type="url" className="form-change__text add-photo__text-link" value={link} onChange={handleChangeLink} required name="link" placeholder="Ссылка на картинку" /> 
        <span className="form-change__input-error link-input-error"></span>
      </fieldset>
    </ PopupWithForm>
  )
}

export default AddPhotoPopup