import React from "react";
import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

interface User {
  name: string;
  about: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser: ({name, about}: User) => void;
}

function EditProfilePopup({isOpen, onClose, onUpdateUser}: Props) {
  const [name, setName] = React.useState<string>('')
  const [description , setDescription ] = React.useState<string>('')
  const currentUser = React.useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function handleChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description
    })
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textBtn={'Сохранить'}
    >   
      <h2 className="form-change__title">Редактировать профиль</h2>
      <fieldset className="form-change__input-text">
        <input id="name-input" type="text" className="form-change__text edit-profile__text-name" value={name || ''} onChange={handleChangeName} minLength={2} maxLength={40} required name='name' placeholder="Введите своё имя" />
        <span className="form-change__input-error name-input-error"></span>
        <input id="job-input" type="text" className="form-change__text edit-profile__text-job" value={description || ''} onChange={handleChangeDescription} minLength={2} maxLength={200} required  name='about' placeholder="Кем вы работаете?" />
        <span className="form-change__input-error job-input-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup