import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

interface Props {
  id: string;
  ownerId: string;
  name: string;
  link: string;
  likes: Array<string>
  onCardDelete: (id: string) => void;
  onCardLike: (id: string, likes: Array<string>) => void;
  onCardClick: (e: React.MouseEvent<HTMLImageElement>) => void;
}

function Card({id, ownerId, name, link, likes, onCardClick, onCardDelete, onCardLike}: Props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = ownerId === currentUser._id;
  const isLiked = likes.some(userId => userId === currentUser._id)
  const cardDeleteButtonClassName = (
    `photo-grid__delete-button ${isOwn ? '' : 'photo-grid__delete-button_hidden'}`
  )
  const cardLikeButtonClassName = (
    `photo-grid__like-button ${isLiked ? 'photo-grid__like-button_active' : ''}`
  )
  
  function handleLikeClick () {
    onCardLike(id, likes)
  }
  function handleDeleteClick () {
    onCardDelete(id)
  }
  return(
    <article className="photo-grid__item">
      <img className="photo-grid__image" src={link} alt={name} onClick={onCardClick}/>
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
      <div className="photo-grid__info">
        <h2 className="photo-grid__title">{name}</h2>
        <div className="photo-grid__container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <h3 className="photo-grid__like-number">{likes.length}</h3>
        </div>
      </div>
    </article>
  )
}
export default Card 