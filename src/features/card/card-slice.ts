import axios from 'axios';
import * as api from '../../config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Movie, Status } from '../../types';

/**
 * Тип для хранения текущих фильмов
 * @typedef {Object} CurrentMovie
 * @property {Movie} [key: string] - Объект фильмов, где ключ - imdbID
 */
type CurrentMovie = {
  [key: string]: Movie;
};

/**
 * Асинхронный thunk для загрузки данных фильма по ID
 * @function loadMovieById
 * @param {string} id - ID фильма (imdbID)
 * @returns {Promise<Movie>} Объект с данными фильма
 * @throws {string} Возвращает сообщение об ошибке при неудачном запросе
 */
export const loadMovieById = createAsyncThunk<
  Movie,
  string,
  { rejectValue: string }
>('@@card/load-movie-by-id', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(api.searchById(id));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return rejectWithValue(error.message);
    return rejectWithValue('Unknown error');
  }
});

/**
 * Состояние среза для работы с карточкой фильма
 * @typedef {Object} CardSlice
 * @property {Status} status - Статус загрузки
 * @property {string|null} error - Сообщение об ошибке
 * @property {CurrentMovie} currentMovie - Кэш загруженных фильмов
 */
type CardSlice = {
  status: Status;
  error: string | null;
  currentMovie: CurrentMovie;
};

/**
 * Начальное состояние среза
 * @type {CardSlice}
 */
const initialState: CardSlice = {
  status: 'idle',
  error: null,
  currentMovie: {},
};

/**
 * Срез Redux для управления состоянием карточки фильма
 * @type {import('@reduxjs/toolkit').Slice<CardSlice>}
 */
export const cardSlice = createSlice({
  name: '@@card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMovieById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadMovieById.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || '';
      })
      .addCase(loadMovieById.fulfilled, (state, action) => {
        state.status = 'received';
        // Кэшируем фильм по его imdbID
        state.currentMovie[action.payload.imdbID] = action.payload;
      });
  },
});

// Экспорт редьюсера
export const cardReducer = cardSlice.reducer;
