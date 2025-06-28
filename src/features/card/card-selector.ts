import { RootState } from '../../store';

/**
 * Селектор для получения полной информации о конкретном фильме по его ID
 * @function selectCurrentMovieId
 * @param {RootState} state - Корневое состояние Redux
 * @param {string} movId - ID фильма (imdbID)
 * @returns {Movie|undefined} Возвращает объект фильма или undefined, если фильм не найден
 * @example
 * // Использование в компоненте
 * const movieDetails = useSelector((state: RootState) => selectCurrentMovieId(state, 'tt1234567'));
 */
export const selectCurrentMovieId = (state: RootState, movId: string) => state.card.currentMovie[movId];

/**
 * Селектор для получения всей информации из среза карточки фильма
 * @function selectCurrentMovieInfo
 * @param {RootState} state - Корневое состояние Redux
 * @returns {CardSlice} Возвращает полное состояние среза карточки фильма
 * @property {Status} status - Текущий статус загрузки
 * @property {string|null} error - Сообщение об ошибке (если есть)
 * @property {CurrentMovie} currentMovie - Кэш всех загруженных фильмов
 * 
 * @example
 * // Использование в компоненте
 * const { status, error, currentMovie } = useSelector(selectCurrentMovieInfo);
 */
export const selectCurrentMovieInfo = (state: RootState) => state.card;