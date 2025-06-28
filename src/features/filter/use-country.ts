import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { setCountry } from './filter-slice';
import { useAppDispatch } from '../../store';
import { Country, OptionSelectCountry } from '../../types';
import { SingleValue } from 'react-select';
import { selectFilter } from './filter-selector';

/**
 * Хук для управления выбором страны в фильтрах
 * @param {URLSearchParams} searchParams - Параметры URL для извлечения начального значения страны
 * @returns {Object} Объект с данными и методами для работы с выбором страны
 * @property {OptionSelectCountry[]} optionsC - Массив вариантов стран для выбора
 * @property {Function} handleSelectCountry - Обработчик выбора страны
 * @property {Country | ''} reduxCountry - Текущая выбранная страна из Redux store
 * @property {CountryOptions} optionsCountry - Объект с полными данными о странах
 */
export const useCountry = (searchParams: URLSearchParams) => {
  const dispatch = useAppDispatch();

  /**
  * Тип для объекта с вариантами стран
  * @typedef {Object} CountryOptions
  * @property {Object} [key: string] - Объект с данными страны
  * @property {Country} value - Значение страны для Redux
  * @property {string} label - Отображаемое название страны
  */
  type CountryOptions = {
    [CountryKey: string]: { value: Country; label: string };
  };

  /**
  * Тип для обработчика выбора страны
  * @typedef {Function} onSelect
  * @param {SingleValue<OptionSelectCountry>} reg - Выбранный вариант страны
  */
  type onSelect = (reg: SingleValue<OptionSelectCountry>) => void;

  /**
   * Объект с вариантами стран для выбора
   * @type {CountryOptions}
   */
  const optionsCountry: CountryOptions = {
    США: { value: 'США', label: 'United States' },
    Россия: { value: 'Россия', label: 'Russia' },
    Великобритания: { value: 'Великобритания', label: 'UK' },
    Франция: { value: 'Франция', label: 'France' },
    Германия: { value: 'Германия', label: 'Germany' },
    ЮжнаяКорея: { value: 'Южная Корея', label: 'South Korea' },
    Япония: { value: 'Япония', label: 'Japan' },
    Китай: { value: 'Китай', label: 'China' },
    Индия: { value: 'Индия', label: 'India' },
  };
  // Получаем страну из URL параметров
  const urlCountryString = searchParams.get('country');
  const optionsC = Object.values(optionsCountry);
  const urlCountry = urlCountryString ? optionsCountry[urlCountryString] : null;

  /**
   * Эффект для установки страны из URL параметров при монтировании
   * @effect
   */
  useEffect(() => {
    if (urlCountry) {
      dispatch(setCountry(urlCountry.value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, searchParams]);

  /**
 * Обработчик выбора страны в селекте
 * @function handleSelectCountry
 * @param {SingleValue<OptionSelectCountry>} selectedOptions - Выбранный вариант
 * @description Если выбрана уже активная страна - сбрасывает выбор, иначе устанавливает новую страну
 */
  const handleSelectCountry: onSelect = (selectedOptions): void => {
    if (
      reduxCountry &&
      selectedOptions &&
      reduxCountry === selectedOptions.value
    ) {
      dispatch(setCountry(''));// Сброс выбора при повторном клике
    } else {
      if (selectedOptions) dispatch(setCountry(selectedOptions.value));
    }
  };
  // Получаем текущую страну из Redux store
  const { country: reduxCountry } = useSelector(selectFilter);

  return { optionsC, handleSelectCountry, reduxCountry, optionsCountry };
};
