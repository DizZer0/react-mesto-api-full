import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import AddPhotoPopup from './AddPhotoPopup'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext'


function Page(props) {
  const [cards, setCards] = React.useState([])
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({})
  const [selectedCard, setSeletedCard] = React.useState({
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
        setCards(res)
      })
      .catch(err => console.log(err))
  }, [])

  function handleCardLike (card) {
    const isLiked = card.likes.some(userId => userId === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(cardId) {
    api.delСardItem(cardId)
      .then((res) => {
        setCards((state) => state.filter(item => item._id !== cardId))
      })
      .catch(err => console.log(err))
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function hanldeCardClick(evt) {
    setSeletedCard({
      active: true,
      src: evt.target.src,
      name: evt.target.alt
    })
  }

  function handleUpdateUser (data) {
    api.subUserInfo(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar (data) {
    api.subAvatarPhoto(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleUpdateCards(data) {
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
    setSeletedCard({active: false})
  }
  return (
      <CurrentUserContext.Provider value={currentUser}>
          <Header url={'/signin'} handleClickExit={props.handleClickExit} title={'Выйти'}/>
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