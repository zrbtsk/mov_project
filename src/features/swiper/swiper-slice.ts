import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import * as api from '../../config';
import { Collections, MovieId, Status } from '../../types';

/**
 * Аргументы для загрузки данных слайдера
 * @typedef {Object} Args
 * @property {string} type - Тип контента (movie/series)
 * @property {string} rating - Рейтинг IMDB
 * @property {string} [genre=''] - Жанр (опционально)
 * @property {string} swiperKey - Уникальный ключ для идентификации слайдера
 */
type Args = {
  type: string;
  rating: string;
  genre: string | '';
  swiperKey: string;
};

/**
 * Параметры запроса к API
 * @typedef {Object} Params
 * @property {number} page - Номер страницы
 * @property {number} limit - Лимит элементов на странице
 * @property {string} notNullFields - Обязательные поля
 * @property {string} selectFields - Требуемые поля
 * @property {string} type - Тип контента
 * @property {string} 'rating.imdb' - Рейтинг IMDB
 * @property {string} [genres.name] - Жанр (опционально)
 */
type Params = {
  page: number;
  limit: number;
  notNullFields: string;
  selectFields: string;
  type: string;
  'rating.imdb': string;
  'genres.name'?: string;
};

/**
 * Асинхронный action creator для загрузки данных слайдера
 * @function loadSwiper
 * @async
 * @param {Args} args - Параметры для загрузки данных
 * @returns {Promise<{data: MovieId[], key: string}>} Объект с данными фильмов и ключом слайдера
 * @throws {string} Возвращает ошибку при неудачном запросе
 * 
 * @example
 * dispatch(loadSwiper({
 *   type: 'movie',
 *   rating: '7-10',
 *   genre: 'action',
 *   swiperKey: 'action-movies'
 * }));
 */
export const loadSwiper = createAsyncThunk<
  { data: MovieId[]; key: string },
  Args,
  { rejectValue: string }
>('@@swiper/load-swiper', async (args, { rejectWithValue }) => {
  const { type, rating, genre = '', swiperKey } = args;

  try {
    const params: Params = {
      page: 1,
      limit: 10,
      notNullFields: 'externalId.imdb',
      selectFields: 'externalId',
      type: type,
      'rating.imdb': rating,
    };
    if (genre) params['genres.name'] = genre;

    const response = await api.searchAll.get('/v1.4/movie', { params });
    return { data: response.data.docs, key: swiperKey };

  } catch (error) {
    if (axios.isAxiosError(error))
      return rejectWithValue(error.response?.data?.message);
    return rejectWithValue('Unknown error');
  }
});

/**
 * Состояние слайса слайдера
 * @typedef {Object} SwiperSlice
 * @property {Status} status - Статус загрузки
 * @property {string|null} error - Сообщение об ошибке
 * @property {Collections} collections - Коллекции фильмов по ключам
 */
export type SwiperSlice = {
  status: Status;
  error: string | null;
  collections: Collections;
};

/**
 * Начальное состояние слайса слайдера
 * @type {SwiperSlice}
 */
const initialState: SwiperSlice = {
  status: 'idle',
  error: null,
  collections: {},
};

/**
 * Слайс для управления состоянием слайдеров
 * @module swiperSlice
 * @property {string} name - Имя слайса
 * @property {SwiperSlice} initialState - Начальное состояние
 * @property {Object} reducers - Редьюсеры
 * @property {Function} extraReducers - Обработчики асинхронных действий
 */
export const swiperSlice = createSlice({
  name: '@@swiper',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSwiper.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadSwiper.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || 'The collection did not load';
      })
      .addCase(loadSwiper.fulfilled, (state, action) => {
        state.status = 'received';
        state.collections[action.payload.key] = action.payload.data;
      });
  },
});

/**
 * Редьюсер слайса слайдера
 * @type {Reducer<SwiperSlice>}
 */
export const swiperReducer = swiperSlice.reducer;
