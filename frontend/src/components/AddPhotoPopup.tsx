import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { ICardInfo } from "../types/types";

interface AddPhotoProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateCards: ({name, link}: ICardInfo) => void;
}

function AddPhotoPopup({isOpen, onClose, onUpdateCards}: AddPhotoProps) {
  const [name, setName] = useState<string>('')
  const [link, setLink] = useState<string>('')

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function handleChangeLink(e: React.ChangeEvent<HTMLInputElement>) {
    setLink(e.target.value)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onUpdateCards({
      name,
      link
    })
  }
  
  useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])
  
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textBtn={'Создать'}
    >
      <h2 className="form-change__title">Новое место</h2>
      <fieldset className="form-change__input-text">
        <input id="titleInput" type="text" className="form-change__text  add-photo__text-title"  value={name} onChange={handleChangeName} minLength={2} maxLength={30} required name="name" placeholder="Название" />
        <span className="form-change__input-error title-input-error">тут ошибка тут ошибка</span>
        <input id="linkInput" type="url" className="form-change__text add-photo__text-link" value={link} onChange={handleChangeLink} required name="link" placeholder="Ссылка на картинку" /> 
        <span className="form-change__input-error link-input-error"></span>
      </fieldset>
    </ PopupWithForm>
  )
}

export default AddPhotoPopup