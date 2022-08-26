import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  console.log(props)
  const isOwn = props.ownerId === currentUser._id;
  const isLiked = props.likes.some(userId => userId === currentUser._id)
  const cardDeleteButtonClassName = (
    `photo-grid__delete-button ${isOwn ? '' : 'photo-grid__delete-button_hidden'}`
  )
  const cardLikeButtonClassName = (
    `photo-grid__like-button ${isLiked ? 'photo-grid__like-button_active' : ''}`
  )
  
  function handleLikeClick () {
    props.onCardLike(props.card)
  }
  function handleDeleteClick () {
    props.onCardDelete(props.card._id)
  }
  return(
    <article className="photo-grid__item">
      <img className="photo-grid__image" src={props.link} alt={props.name} onClick={props.onCardClick}/>
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
      <div className="photo-grid__info">
        <h2 className="photo-grid__title">{props.name}</h2>
        <div className="photo-grid__container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <h3 className="photo-grid__like-number" name="likes">{props.likes.length}</h3>
        </div>
      </div>
    </article>
  )
}
export default Card 