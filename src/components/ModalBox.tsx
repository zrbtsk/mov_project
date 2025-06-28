import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectAutorization } from '../features/autorization/autorization-select';

/**
 * Компонент модального окна с предложением подписки
 * @component
 * @returns {JSX.Element} Возвращает модальное окно, которое появляется через 5 секунд для неавторизованных пользователей
 * @description
 * Компонент модального окна с особенностями:
 * - Появляется через 5 секунд после загрузки страницы
 * - Не отображается для авторизованных пользователей
 * - Предлагает перейти на страницу авторизации
 * - Имеет кнопку закрытия
 */
export const ModalBox = () => {
  const navigate = useNavigate();
  const autorization = useSelector(selectAutorization);

  const modalRef = useRef<HTMLDivElement>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  /**
 * Эффект для управления отображением модального окна
 * @effect
 * @description Запускает таймер для показа модального окна через 5 секунд
 * для неавторизованных пользователей
 */
  useEffect(() => {
    if (autorization) return;

    intervalId.current = setInterval(() => {
      if (modalRef.current) {
        modalRef.current.style.display = 'block';
      }
    }, 5000);
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autorization]);

  /**
 * Закрывает модальное окно и очищает интервал
 * @function closeModal
 */
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.style.display = 'none';
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    }
  };

  return (
    <>
      <div className='modal' ref={modalRef}>
        <div className='modal__content'>
          <span className='modal__close' onClick={() => closeModal()}>
            &times;
          </span>
          <div className='modal__text'>
            Subscribe to MOV so that your favorite movies don`t get lost
          </div>
          <div className='modal__btn' onClick={() => navigate('/autorization')}>
            Subscribe
          </div>
        </div>
      </div>
    </>
  );
};
