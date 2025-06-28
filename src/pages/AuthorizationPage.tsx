import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { CustomFlower } from '../components/CustomFlower';
import { useAutorization } from '../features/autorization/use-autorization';

import backIcon from '@/assets/images/icon_back.png';
import backLightIcon from '@/assets/images/icon_back-light.svg';
import logoDark from '@/assets/images/logo.png';
import logoLight from '@/assets/images/logo-light.jpeg';

/**
 * Страница авторизации/регистрации пользователя
 * @component
 * @returns {JSX.Element} Возвращает страницу авторизации с формой входа
 * @description
 * Компонент страницы авторизации с особенностями:
 * - Декоративные цветочные элементы (CustomFlower)
 * - Адаптивный интерфейс под текущую тему
 * - Валидация email и пароля
 * - Всплывающие подсказки при ошибках
 * - Переключение между логином и регистрацией
 */
export const AuthorizationPage = () => {
  const navigate = useNavigate();
  const {
    emailRef,
    passwordRef,
    tooltipEmail,
    tooltipPassword,
    handleSubmit,
    tooltipRegister,
    theme,
  } = useAutorization();

  return (
    <>
      <div className='autorization__background'>
        {/* Декоративные элементы */}
        <CustomFlower />

        {/* Основной контейнер формы */}
        <div
          className='autorization__container'
          data-tooltip-id='mbRegister-tooltip'
          data-tooltip-content='Would you like to register?'
        >
          {/* Подсказка для регистрации */}
          <Tooltip
            id='mbRegister-tooltip'
            isOpen={tooltipRegister}
            float={true}
            noArrow
          />
          {/* Шапка формы */}
          <div className='autorization__container__header'>

            {/* Кнопка назад */}
            <img
              src={theme === 'dark' ? backIcon : backLightIcon }
              alt="Back button"
              className='autorization__container__back'
              onClick={() => navigate(-1)}
            />
            {/* Логотип */}
            <img
              src={theme === 'dark' ? logoDark : logoLight}
              alt="Site logo"
              width={theme === 'dark' ? '80px' : '80px'}
              height={theme === 'dark' ? '35px' : '32px'}
              className='autorization__container__logo'
            />

            <h1 className='autorization__container__h'>ID</h1>
          </div>
          {/* Форма авторизации */}
          <form className='autorization__container__main'>
            <h2 className='autorization__container__text'>
              Enter your phone number
            </h2>
            <p className='autorization__container__p'> Log in or register</p>

            {/* Поле ввода email */}
            <input
              type='email'
              placeholder='email'
              className='autorization__container__input'
              onInvalid={(e) => e.preventDefault()}
              ref={emailRef}
              data-tooltip-id='email-tooltip'
              data-tooltip-content='Enter your email in the format example@mail.com'
            />
            <Tooltip id='email-tooltip' isOpen={tooltipEmail} float={true} />

            {/* Поле ввода пароля */}
            <input
              type='password'
              placeholder='password'
              className='autorization__container__input'
              onInvalid={(e) => e.preventDefault()}
              ref={passwordRef}
              data-tooltip-id='password-tooltip'
              data-tooltip-content='The password must contain more than 4 characters'
            />
            <Tooltip
              id='password-tooltip'
              isOpen={tooltipPassword}
              float={true}
            />
            {/* Кнопка отправки формы */}
            <input
              type='submit'
              value={tooltipRegister === false ? 'Log in' : 'Yes'}
              className='autorization__container__btn'
              onClick={(e) => handleSubmit(e)}
            />
          </form>
        </div>
      </div>
    </>
  );
};
