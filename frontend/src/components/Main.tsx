import React from "react";
import Card from "./Card"
import { CurrentUserContext } from '../contexts/CurrentUserContext'

interface Cards {
  id: string;
  owner: string;
  name: string;
  link: string;
  likes: Array<string>
  createdAt: string
  __v: number
  _id: string
}

type Props = {
  cards: Cards[];
  onEditAvatar: () => void;
  onEditProfile: () => void;
  onAddPlace: () => void;
  onCardDelete: (id: string) => void;
  onCardLike: (id: string, likes: Array<string>) => void;
  onCardClick: (e: React.MouseEvent<HTMLImageElement>) => void;
}

function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardDelete, onCardLike, onCardClick}: Props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img  alt="аватарка пользователя" className="profile__avatar" src={currentUser.avatar} />
        <button className="profile__avatar-btn" onClick={onEditAvatar}></button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <h2 className="profile__status">{currentUser.about}</h2>
          <button className="profile__edit-button" type="button" onClick={onEditProfile} />
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="photo-grid">
      {cards.map(card => 
        <Card
          key={card._id}
          id={card._id}
          ownerId={card.owner}
          name={card.name}
          link={card.link} 
          likes={card.likes} 
          onCardDelete={onCardDelete} 
          onCardLike={onCardLike} 
          onCardClick={onCardClick}
        />
      )}
      </section>
    </main>
  )
}

 export default Main