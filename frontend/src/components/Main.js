import React from "react";
import Card from "./Card"
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

 

  return (
    <main className="content">
      <section className="profile">
        <img  alt="аватарка пользователя" className="profile__avatar" src={currentUser.avatar} />
        <button className="profile__avatar-btn" onClick={props.onEditAvatar}></button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <h2 className="profile__status">{currentUser.about}</h2>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile} />
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="photo-grid">
      {props.cards.map(card => 
        <Card
          key={card._id}
          card={card}
          ownerId={card.owner._id} name={card.name}
          link={card.link} 
          likes={card.likes} 
          onCardDelete={props.onCardDelete} 
          onCardLike={props.onCardLike} 
          onCardClick={props.onCardClick}/>
      )}
      </section>
    </main>
  )
}

 export default Main