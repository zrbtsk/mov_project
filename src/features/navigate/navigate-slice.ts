import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../config';
import { Genre, MovieId, Status } from '../../types';
import axios from 'axios';

/**
 * Аргументы для thunk'а loadNavigate
 * @typedef {Object} Args
 * @property {string} [type] - Тип контента для фильтрации/ навигации
 * @property {Genre[]} [genre] - Массив жанров для фильтрации/ навигации
 * @property {string} [country] - Страна для фильтрации/ навигации
 * @property {string} [year] - Год выпуска для фильтрации
 * @property {string} [rating] - Минимальный рейтинг IMDb для фильтрации
 * @property {number} [page=1] - Номер страницы для пагинации
 */
type Args = {
  type?: string;
  genre?: Genre[];
  country?: string;
  year?: string;
  rating?: string;
  page?: number;
};

/**
 * Асинхронный thunk для загрузки фильмов по навигации/фильтрам
 * @function loadNavigate
 * @returns {Promise<{data: MovieId[], page: number}>} Объект с данными фильмов и текущей страницей
 * @throws Выбрасывает ошибку с сообщением при неудачном запросе к API
 */
export const loadNavigate = createAsyncThunk<
  { data: MovieId[]; page: number },
  Args,
  { rejectValue: string }
>('@@navigate/load-navigate', async (args, { rejectWithValue }) => {
  const {
    type,
    genre = [],
    country,
    year,
    rating,
    page = 1,
  } = args;
  try {
    const searchParams = new URLSearchParams();

    // Создание параметров URL для запроса к API
    searchParams.append('limit', '10');
    searchParams.append('notNullFields', 'externalId.imdb');
    searchParams.append('selectFields', 'externalId');
    searchParams.append('page', String(page));

    // Добавление опциональных фильтров, если они указаны
    if (type) searchParams.append('type', type);
    if (genre.length > 0) {
      genre.forEach((gen) => {
        searchParams.append('genres.name', gen); // genres.name=драма&genres.name=криминал
      });
    }
    if (country) searchParams.append('countries.name', country);
    if (year) searchParams.append('year', year);
    if (rating) searchParams.append('rating.imdb', rating);

    // Выполнение запроса к API
    const response = await api.searchAll.get('/v1.4/movie', {
      params: searchParams,
    });
    return { data: response.data.docs, page: page };
  } catch (error) {
    if (axios.isAxiosError(error))
      return rejectWithValue(error.response?.data?.message);
    return rejectWithValue('Unknown error');
  }
});

/**
 * Состояние навигационного среза
 * @typedef {Object} NavigateSlice
 * @property {string|null} error - Текст ошибки или null
 * @property {Status} status - Статус загрузки
 * @property {MovieId[]} list - Список фильмов
 */
export type NavigateSlice = {
  error: string | null;
  status: Status;
  list: MovieId[];
};

/**
 * Начальное состояние навигационного среза
 * @type {NavigateSlice}
 */
const initialState: NavigateSlice = {
  error: null,
  status: 'idle',
  list: [],
};

/**
 * Срез Redux для работы с навигацией/фильтрацией фильмов
 * @type {import('@reduxjs/toolkit').Slice<NavigateSlice>}
 */
export const navigateSlice = createSlice({
  name: '@@navigate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadNavigate.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadNavigate.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || 'The films didn`t sink in';
      })
      .addCase(loadNavigate.fulfilled, (state, action) => {
        state.status = 'received';
        const { data, page } = action.payload;
        // Обновляем список: для первой страницы заменяем, для последующих - добавляем
        state.list = page === 1 ? data : [...state.list, ...data];
      });
  },
});

// Реэкспорт редьюсера
export const navigateReducer = navigateSlice.reducer;
