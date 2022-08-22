import successLogo from '../images/success-logo.svg'
import failLogo from '../images/fail-logo.svg'

const InfoTooltip = (props) => {
  const successText = 'Вы успешно зарегистрировались!'
  const failText = 'Что-то пошло не так! Попробуйте ещё раз.'
  return (
    <div className={`popup popup_type_view-photo popup_view-photo ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__exit-button" onClick={props.handleClickPopupExit} type="button" ></button>
        <div className='info-tooltip'>
          <img className='info-tooltip__img' src={props.isSuccess ? successLogo : failLogo}></img>
          <h2 className='info-tooltip__title'>{props.isSuccess ? successText : failText}</h2>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip