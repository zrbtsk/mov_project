import { RootState } from '../../store';

/**
 * Селектор для получения всей информации из среза movies
 * @function selectMoviesInfo
 * @param {RootState} state - Корневое состояние Redux
 * @returns {MoviesSlice} Возвращает весь срез movies со статусом, ошибкой, списком фильмов и количеством страниц
 * @example
 * const { status, error, list, pages } = useAppSelector(selectMoviesInfo);
 */
export const selectMoviesInfo = (state: RootState) => state.movies;

/**
 * Селектор для получения списка найденных фильмов
 * @function selectMoviesList
 * @param {RootState} state - Корневое состояние Redux
 * @returns {MovieOnSearch[]} Возвращает массив фильмов, соответствующих поисковому запросу
 * @example
 * const moviesList = useSelector(selectMoviesList);
 */
export const selectMoviesList = (state: RootState) => state.movies.list;

/**
 * Селектор для получения общего количества страниц с результатами поиска
 * @function selectMoviesPages
 * @returns {number|null} Возвращает общее количество страниц или null, если поиск не выполнялся
 * @example
 * const pages = useSelector(selectMoviesPages);
 */
export const selectMoviesPages = (state: RootState) => state.movies.pages;
