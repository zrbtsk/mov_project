import { ChangeEventHandler, useEffect, useRef, useState } from 'react';

import { setYear } from './filter-slice';
import { useAppDispatch } from '../../store';
import { ClickOutsideHandler } from '../../types';

/**
 * Хук для управления фильтром по годам выпуска
 * @returns {Object} Объект с методами и состояниями для работы с фильтром годов
 * @property {React.RefObject<HTMLDivElement>} menuRefYears - Референс на меню выбора годов
 * @property {Function} toggleMenuYear - Переключает видимость меню выбора годов
 * @property {Function} setInputFromYear - Обработчик изменения начального года
 * @property {Function} setInputToYear - Обработчик изменения конечного года
 * @property {Function} doneYear - Применяет выбранный диапазон годов
 * @property {boolean} isMenuOpenYear - Состояние видимости меню
 * @property {Function} resetYear - Сбрасывает фильтр по годам
 * @property {Function} handleKeyDownYears - Обработчик нажатия клавиш в поле ввода
 */
export const useYears = () => {
  const dispatch = useAppDispatch();
  const menuRefYears = useRef<HTMLDivElement>(null);

  // Состояния для управления меню и значениями годов
  const [isMenuOpenYear, setIsMenuOpenYear] = useState(false);
  const [isFromYear, setFromYear] = useState(1874);
  const [isToYear, setToYear] = useState(2025);

  /**
 * Переключает видимость меню выбора годов
 * @function toggleMenuYear
 */
  const toggleMenuYear = () => {
    setIsMenuOpenYear(!isMenuOpenYear);
  };

  /**
   * Эффект для закрытия меню при клике вне его области
   * @effect
   */
  useEffect(() => {
    const handleClickOutsideYears: ClickOutsideHandler = (event) => {
      if (
        menuRefYears.current &&
        !menuRefYears.current.contains(event.target as Node)
      ) {
        setIsMenuOpenYear(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideYears);
    return () =>
      document.removeEventListener('mousedown', handleClickOutsideYears);
  }, []);

  /**
   * Обработчик нажатия клавиши Enter в поле ввода года
   * @function handleKeyDownYears
   * @param {React.KeyboardEvent<HTMLInputElement>} event - Событие клавиатуры
   */
  const handleKeyDownYears = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter' && isMenuOpenYear) {
      dispatch(setYear(`${isFromYear}-${isToYear}`));
      setIsMenuOpenYear(false);
    }
  };

  /**
   * Обработчик изменения начального года
   * @function setInputFromYear
   * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения
   */
  const setInputFromYear: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.valueAsNumber;

    if ((newValue >= 1874 && newValue <= 2025) || isNaN(newValue)) {
      newValue ? setFromYear(newValue) : setFromYear(1874);
    }
  };
  /**
   * Обработчик изменения конечного года
   * @function setInputToYear
   * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения
   */
  const setInputToYear: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.valueAsNumber;
    if ((newValue >= 1874 && newValue <= 2025) || isNaN(newValue)) {
      newValue ? setToYear(newValue) : setToYear(2025);
    }
  };

  /**
   * Применяет выбранный диапазон годов
   * @function doneYear
   */
  const doneYear = () => {
    dispatch(setYear(`${isFromYear}-${isToYear}`));
    setIsMenuOpenYear(!isMenuOpenYear);
  };

  /**
   * Сбрасывает фильтр по годам
   * @function resetYear
   */
  const resetYear = () => {
    dispatch(setYear(''));
    setIsMenuOpenYear(!isMenuOpenYear);
  };
  return {
    menuRefYears,
    toggleMenuYear,
    setInputFromYear,
    setInputToYear,
    doneYear,
    isMenuOpenYear,
    resetYear,
    handleKeyDownYears,
  };
};
