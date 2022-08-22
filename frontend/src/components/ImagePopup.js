import React from "react";

function ImagePopup(props) {

  return(
    <div className={`popup popup_type_view-photo popup_view-photo ${props.card.active ? 'popup_opened' : ""}`}>
      <div className="popup__container">
        <button className="popup__exit-button" type="button" onClick={props.onClose}></button>
        <div className="view-photo">
          <img className='view-photo__img' src={props.card.src} alt={props.card.name} />
          <h2 className="view-photo__title">{props.card.name}</h2>
        </div>
      </div>
    </div>
  )
}
export default ImagePopup