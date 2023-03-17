import successLogo from '../images/success-logo.svg'
import failLogo from '../images/fail-logo.svg'

interface Props {
  isOpen: boolean;
  handleClickPopupExit: () => void;
  isSuccess: boolean;
}

const InfoTooltip = ({isOpen, handleClickPopupExit, isSuccess}: Props) => {
  const successText = 'Вы успешно зарегистрировались!'
  const failText = 'Что-то пошло не так! Попробуйте ещё раз.'
  
  return (
    <div className={`popup popup_type_view-photo popup_view-photo ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__exit-button" onClick={handleClickPopupExit} type="button" ></button>
        <div className='info-tooltip'>
          <img className='info-tooltip__img' src={isSuccess ? successLogo : failLogo} alt=''/>
          <h2 className='info-tooltip__title'>{isSuccess ? successText : failText}</h2>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip