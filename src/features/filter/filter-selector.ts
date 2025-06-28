import { RootState } from '../../store';

/**
 * Селектор для получения выбранных жанров
 * @function selectGenre
 * @param {RootState} state - Корневое состояние Redux
 * @returns {Genre[]} Возвращает массив выбранных жанров или пустой массив, если жанры не выбраны
 * @example
 * const genres = useSelector(selectGenre);
 */
export const selectGenre = (state: RootState) => state.filter.genre || [];

/**
 * Селектор для получения выбранной страны
 * @function selectCountry
 * @param {RootState} state - Корневое состояние Redux
 * @returns {string} Возвращает выбранную страну или пустую строку, если страна не выбрана
 * @example
 * const country = useSelector(selectCountry);
 */
export const selectCountry = (state: RootState) => state.filter.country;
/**
 * Селектор для получения выбранного года
 * @function selectYear
 * @param {RootState} state - Корневое состояние Redux
 * @returns {string} Возвращает выбранный год или пустую строку, если год не выбран
 * @example
 * const year = useSelector(selectYear);
 */
export const selectYear = (state: RootState) => state.filter.year;

/**
 * Селектор для получения выбранного рейтинга
 * @function selectRating
 * @param {RootState} state - Корневое состояние Redux
 * @returns {string} Возвращает выбранный рейтинг или пустую строку, если рейтинг не выбран
 * @example
 * const rating = useSelector(selectRating);
 */
export const selectRating = (state: RootState) => state.filter.rating;

/**
 * Селектор для получения всех фильтров
 * @function selectFilter
 * @param {RootState} state - Корневое состояние Redux
 * @returns {FilterSlice} Возвращает полное состояние фильтров
 * @example
 * const { genre, country, year, rating } = useSelector(selectFilter);
 */
export const selectFilter = (state: RootState) => state.filter;
