import React from "react";
import PopupWithForm from "./PopupWithForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpdateAvatar: (link: string) => void;
}

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}: Props) {
  const [valueInput, setvalueInput] = React.useState<string>('')

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setvalueInput(e.target.value)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onUpdateAvatar(valueInput)
  }
  return(
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textBtn={'Сохранить'}
    > 
      <h2 className="form-change__title">Обновить аватар</h2>
      <fieldset className="form-change__input-text">
        <input id="avatar-input" type="url" className="form-change__text edit-avatar__text-link" onChange={changeHandler} required name="avatar" placeholder="Ссылка на картинку" /> 
        <span className="form-change__input-error avatar-input-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup