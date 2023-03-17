import React from "react";
import { IImage } from "../types/types";

interface Props {
  card: IImage;
  onClose: () => void;
}

function ImagePopup({card, onClose}: Props) {

  return(
    <div className={`popup popup_type_view-photo popup_view-photo ${card.active ? 'popup_opened' : ""}`}>
      <div className="popup__container">
        <button className="popup__exit-button" type="button" onClick={onClose}></button>
        <div className="view-photo">
          <img className='view-photo__img' src={card.src} alt={card.name} />
          <h2 className="view-photo__title">{card.name}</h2>
        </div>
      </div>
    </div>
  )
}
export default ImagePopup