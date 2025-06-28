import { ChangeEventHandler, useEffect, useRef, useState } from 'react';

import { setRating } from './filter-slice';
import { ClickOutsideHandler } from '../../types';
import { useAppDispatch } from '../../store';

/**
 * Хук для управления фильтром по рейтингу
 * @returns {Object} Объект с методами и состояниями для работы с фильтром рейтинга
 * @property {React.RefObject<HTMLDivElement>} menuRefRating - Референс на меню выбора рейтинга
 * @property {Function} toggleMenuRating - Функция переключения видимости меню
 * @property {boolean} isMenuOpenRating - Состояние видимости меню
 * @property {Function} setInputFromRating - Обработчик изменения минимального рейтинга
 * @property {Function} setInputToRating - Обработчик изменения максимального рейтинга
 * @property {Function} doneRating - Функция применения выбранного диапазона рейтинга
 * @property {Function} resetRating - Функция сброса фильтра рейтинга
 * @property {Function} handleKeyDownRating - Обработчик нажатия клавиш в поле ввода
 */
export const useRating = () => {
  const dispatch = useAppDispatch();
  const menuRefRating = useRef<HTMLDivElement>(null);

  // Состояния для управления меню и значениями рейтинга
  const [isMenuOpenRating, setIsMenuOpenRating] = useState(false);
  const [isFromRating, setFromRating] = useState(1);
  const [isToRating, setToRating] = useState(10);

  /**
 * Переключает видимость меню выбора рейтинга
 * @function toggleMenuRating
 * @param {React.MouseEvent} e - Событие клика
 */
  const toggleMenuRating = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpenRating(!isMenuOpenRating);
  };

  /**
 * Эффект для закрытия меню при клике вне его области
 * @effect
 */
  useEffect(() => {
    const handleClickOutsideRating: ClickOutsideHandler = (event) => {
      if (
        menuRefRating.current &&
        !menuRefRating.current.contains(event.target as Node)
      ) {
        setIsMenuOpenRating(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideRating);
    return () =>
      document.removeEventListener('mousedown', handleClickOutsideRating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Обработчик нажатия клавиши Enter в поле ввода рейтинга
   * @function handleKeyDownRating
   * @param {React.KeyboardEvent<HTMLInputElement>} e - Событие клавиатуры
   */
  const handleKeyDownRating = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === 'Enter' && isMenuOpenRating) {
      dispatch(setRating(`${isFromRating}-${isToRating}`));
      setIsMenuOpenRating(false);
    }
  };

  /**
   * Обработчик изменения минимального значения рейтинга
   * @function setInputFromRating
   * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения
   */
  const setInputFromRating: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.valueAsNumber;
    if ((newValue >= 1 && newValue <= 10) || isNaN(newValue)) {
      newValue ? setFromRating(newValue) : setFromRating(1);
    }
  };

  /**
   * Обработчик изменения максимального значения рейтинга
   * @function setInputToRating
   * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения
   */
  const setInputToRating: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.valueAsNumber;
    if ((newValue >= 1 && newValue <= 10) || isNaN(newValue)) {
      newValue ? setToRating(newValue) : setToRating(10);
    }
  };

  /**
   * Применяет выбранный диапазон рейтинга
   * @function doneRating
   */
  const doneRating = () => {
    dispatch(setRating(`${isFromRating}-${isToRating}`));
    setIsMenuOpenRating(false);
  };

  /**
   * Сбрасывает фильтр рейтинга
   * @function resetRating
   */
  const resetRating = () => {
    dispatch(setRating(''));
    setIsMenuOpenRating(false);
  };

  return {
    menuRefRating,
    toggleMenuRating,
    isMenuOpenRating,
    setInputFromRating,
    setInputToRating,
    doneRating,
    resetRating,
    handleKeyDownRating,
  };
};
