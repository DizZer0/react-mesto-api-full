import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarInput = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvatar(avatarInput.current.value)
  }
  return(
    <PopupWithForm 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      textBtn={'Сохранить'}
    > 
      <h2 className="form-change__title">Обновить аватар</h2>
      <fieldset className="form-change__input-text">
        <input id="avatar-input" type="url" className="form-change__text edit-avatar__text-link" ref={avatarInput} required name="avatar" placeholder="Ссылка на картинку" /> 
        <span className="form-change__input-error avatar-input-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup