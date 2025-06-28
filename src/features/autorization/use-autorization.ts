import { MouseEventHandler, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAutorization } from './autorization-slice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { selectTheme } from '../theme/theme-selector';

/**
 * Хук для управления процессом авторизации пользователя
 * @returns {Object} Объект с методами и состояниями для работы с авторизацией
 * @property {React.RefObject<HTMLInputElement>} emailRef - Референс на поле ввода email
 * @property {React.RefObject<HTMLInputElement>} passwordRef - Референс на поле ввода пароля
 * @property {boolean} tooltipEmail - Состояние отображения подсказки для email
 * @property {boolean} tooltipPassword - Состояние отображения подсказки для пароля
 * @property {boolean} tooltipRegister - Состояние отображения подсказки о неверных данных
 * @property {Function} handleSubmit - Обработчик отправки формы авторизации
 * @property {string} theme - Текущая тема приложения
 */
export const useAutorization = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [tooltipEmail, setTooltipEmail] = useState(false);
  const [tooltipPassword, setTooltipPassword] = useState(false);
  const [tooltipRegister, setTooltipRegister] = useState(false);

  const theme = useSelector(selectTheme);

  /**
 * Тестовые данные пользователя для демонстрации
 * @constant
 * @type {Object}
 * @property {string} email - Email пользователя
 * @property {string} password - Пароль пользователя
 */
  const user = {
    email: 'zrbtsk@mail.ru',
    password: 'vikazar',
  };

  /**
   * Обработчик отправки формы авторизации
   * @function handleSubmit
   * @param {React.MouseEvent<HTMLInputElement>} event - Событие клика
   * @description Выполняет валидацию полей и авторизацию пользователя
   */
  const handleSubmit: MouseEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    if (emailRef.current && passwordRef.current) {
      // Сброс стилей и подсказок
      emailRef.current.style.border = '1px solid #c0c0c0';
      passwordRef.current.style.border = '1px solid #c0c0c0';
      setTooltipEmail(false);
      setTooltipPassword(false);

      // Валидация email
      if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(
          emailRef.current.value
        )
      ) {
        emailRef.current.style.border = '1px solid #A52A2A';
        setTooltipEmail(true);
        return;
      }

      // Валидация пароля
      if (passwordRef.current.value.length < 4) {
        passwordRef.current.style.border = '1px solid #A52A2A';
        setTooltipPassword(true);
        return;
      }

      // Проверка учетных данных
      if (
        (passwordRef.current.value === user.password &&
          emailRef.current.value === user.email) ||
        tooltipRegister === true
      ) {
        dispatch(setAutorization(true));
        navigate('/favourite');
      } else {
        setTooltipRegister(true);
      }
    }
  };
  return {
    emailRef,
    passwordRef,
    tooltipEmail,
    tooltipPassword,
    handleSubmit,
    tooltipRegister,
    theme,
  };
};
