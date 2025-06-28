import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '../../config';
import { MovieOnSearch, Status } from '../../types';
import axios from 'axios';

/**
 * Аргументы для thunk'а loadMoviesBySearch
 * @typedef {Object} Args
 * @property {string} search - Поисковый запрос
 * @property {number} [page=1] - Номер страницы для пагинации
 */
type Args = {
  search: string,
  page: number,
}

/**
 * Ответ API с данными о фильмах
 * @typedef {Object} MoviesList
 * @property {MovieOnSearch[]} data - Массив найденных фильмов
 * @property {number} page - Текущая страница
 * @property {number} pages - Общее количество страниц
 */
type MoviesList = {
  data: MovieOnSearch[],
  page: number,
  pages: number,

}

/**
 * Асинхронный thunk для загрузки фильмов по поисковому запросу
 * @function loadMoviesBySearch
 * @returns {Promise<MoviesList>} Объект с данными фильмов и пагинацией
 * @throws Выбрасывает ошибку с сообщением при неудачном запросе к API
 */
export const loadMoviesBySearch = createAsyncThunk<
  MoviesList,
  Args,
  { rejectValue: string }
>('@@movies/load-movies-by-search', async (args, { rejectWithValue }) => {
  const { search, page = 1 } = args;

  try {
    const searchParams = new URLSearchParams();
    searchParams.append('page', String(page));
    searchParams.append('limit', '10');
    searchParams.append('query', search);
    const response = await api.searchAll.get('/v1.4/movie/search', {
      params: searchParams,
    });

    return { data: response.data.docs, page, pages: response.data.pages };
  } catch (error) {
    if (axios.isAxiosError(error))
      return rejectWithValue(error.response?.data?.message);
    return rejectWithValue('Unknown error');
  }
}
);

/**
 * Состояние среза для фильмов по поиску
 * @typedef {Object} MoviesSlice
 * @property {Status} status - Статус загрузки
 * @property {string|null} error - Сообщение об ошибке
 * @property {MovieOnSearch[]} list - Список найденных фильмов
 * @property {number|null} pages - Общее количество страниц
 */
type MoviesSlice = {
  status: Status,
  error: string | null,
  list: MovieOnSearch[],
  pages: number | null,
}

/**
 * Начальное состояние среза
 * @type {MoviesSlice}
 */
const initialState: MoviesSlice = {
  status: 'idle',
  error: null,
  list: [],
  pages: null,
};

/**
 * Срез Redux для управления состоянием поиска фильмов
 * @type {import('@reduxjs/toolkit').Slice<MoviesSlice>}
 */
export const moviesSlice = createSlice({
  name: '@@movies',
  initialState,
  reducers: {
    /**
   * Очищает список фильмов и сбрасывает состояние
   * @function clearMovies
   */
    clearMovies: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMoviesBySearch.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadMoviesBySearch.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || 'The films didnt sink in';
      })
      .addCase(loadMoviesBySearch.fulfilled, (state, action) => {
        state.status = 'received';
        const { data, page, pages } = action.payload;
        // Фильтруем фильмы, у которых есть IMDB ID
        const listId = data.filter(movie => movie.externalId?.imdb);
        // Обновляем список: для первой страницы заменяем, для последующих - добавляем
        state.list = page === 1 ? listId : [...state.list, ...listId];
        state.pages = pages;
      });
  },
});

// Экспорт редьюсера и действий
export const moviesReducer = moviesSlice.reducer;
export const { clearMovies } = moviesSlice.actions;
