import React from 'react';
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import AddPhotoPopup from './AddPhotoPopup'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/Api';

import { IImage } from '../types/types';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

interface User {
  about: string;
  avatar: string;
  email: string;
  name: string;
  _id: string;
}

interface Card {
  id: string;
  owner: string;
  name: string;
  link: string;
  likes: Array<string>
  createdAt: string
  __v: number
  _id: string
}


function Page() {
  const [cards, setCards] = React.useState<Card[]>([])

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState<boolean>(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState<boolean>(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState<boolean>(false)
  const [currentUser, setCurrentUser] = React.useState<User>({
    about: '',
    avatar: '',
    email: '',
    name: '',
    _id: '',
  })
  // как насчет глобального интерфейса?
  const [selectedCard, setSeletedCard] = React.useState<IImage>({
    active: false,
    src: '',
    name: '',
  })

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {setCurrentUser(res)})
      .catch(err => console.log(err))

    api.getCardItems()
      .then((res) => {
        console.log(res)
        setCards(res)
      })
      .catch(err => console.log(err))
  }, [])

  function handleCardLike (id: string, likes: string[]): void {
    const isLiked = likes.some(userId => userId === currentUser._id);
    api.changeLikeCardStatus(id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((item) => item._id === id ? newCard : item));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(cardId: string): void {
    api.delСardItem(cardId)
      .then((res) => {
        setCards((state) => state.filter(item => item._id !== cardId))
      })
      .catch(err => console.log(err))
  }

  function handleEditAvatarClick(): void {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick(): void {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick(): void {
    setAddPlacePopupOpen(true)
  }
// почему не работает <HTMLImageElement> в параметрах функции
  function hanldeCardClick(e: React.MouseEvent) {
    const target = e.target as HTMLImageElement
    setSeletedCard({
      active: true,
      src: target.src,
      name: target.alt
    })
  }

  function handleUpdateUser (data: {name: string, about: string}): void {
    api.subUserInfo(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar (valueInput: string): void {
    api.subAvatarPhoto(valueInput)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleUpdateCards(data: {name: string, link: string}): void {
    api.subCardItem(data)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }
  
  function closeAllPopups() {
    setAddPlacePopupOpen(false)
    setEditProfilePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSeletedCard({
      active: false,
      src: '',
      name: '',
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Main 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={hanldeCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        />
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPhotoPopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateCards={handleUpdateCards}/>
      <ImagePopup 
      card={selectedCard}
      onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider> 
  );
}

export default Page;