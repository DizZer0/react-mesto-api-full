import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  textBtn: string;
  children: React.ReactNode;
}

function PopupWithForm({isOpen, onClose, onSubmit, textBtn, children}: Props) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__exit-button" type="button" onClick={onClose}></button>
        <form action="#" onSubmit={onSubmit}  className={`form-change`} noValidate>
          {children}  
          <button className={`form-change__save-button`} type='submit'>{textBtn}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm