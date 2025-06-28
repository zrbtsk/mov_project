import { RootState } from '../../store';

/**
 * Селектор для получения всей информации из навигационного среза
 * @function selectNavigateInfo
 * @param {RootState} state - Корневое состояние Redux
 * @returns {NavigateSlice} Возвращает весь навигационный срез состояния
 * @example
 * const { list, status, error } = useSelector(selectNavigateInfo);
 */
export const selectNavigateInfo = (state: RootState) => state.navigate;

/**
 * Селектор для получения списка фильмов из навигационного среза
 * @function selectNavigateList
 * @param {RootState} state - Корневое состояние Redux
 * @returns {MovieId[]} Возвращает массив фильмов
 * @example
 * const moviesList = useSelector(selectNavigateList);
 */
export const selectNavigateList = (state: RootState) => state.navigate.list;
