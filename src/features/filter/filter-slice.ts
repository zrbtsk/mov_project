import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Genre } from '../../types';

/**
 * Состояние среза фильтров
 * @typedef {Object} FilterSlice
 * @property {Genre[] | []} genre - Выбранные жанры
 * @property {string | ''} country - Выбранная страна
 * @property {string | ''} year - Выбранный год
 * @property {string | ''} rating - Выбранный рейтинг
 */
type FilterSlice = {
  genre: Genre[] | [];
  country: string | '';
  year: string | '';
  rating: string | '';
};

/**
 * Начальное состояние среза фильтров
 * @type {FilterSlice}
 */
const initialState: FilterSlice = {
  genre: [],
  country: '',
  year: '',
  rating: '',
};

/**
 * Срез Redux для управления фильтрами
 * @type {import('@reduxjs/toolkit').Slice<FilterSlice>}
 */
export const filterSlice = createSlice({
  name: '@@filter',
  initialState,
  reducers: {

    // Устанавливает выбранные жанры
    setGenre: (state, action: PayloadAction<Genre[] | []>) => {
      state.genre = action.payload;
    },
    // Устанавливает выбранную страну
    setCountry: (state, action: PayloadAction<string | ''>) => {
      state.country = action.payload;
    },
    // Устанавливает выбранный год
    setYear: (state, action: PayloadAction<string | ''>) => {
      state.year = action.payload;
    },
    // Устанавливает выбранный рейтинг
    setRating: (state, action: PayloadAction<string | ''>) => {
      state.rating = action.payload;
    },
    //Сбрасывает все фильтры к начальному состоянию
    clearFilter: () => initialState,
  },
});

// Экспорт редьюсера и действий
export const filterReducer = filterSlice.reducer;
export const { setGenre, setCountry, setYear, setRating, clearFilter } =
  filterSlice.actions;
