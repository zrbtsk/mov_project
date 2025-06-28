import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Срез Redux для управления списком избранных фильмов
 * @type {import('@reduxjs/toolkit').Slice<string[]>}
 */
export const favouriteSlice = createSlice({
  name: '@favourite',
  initialState: [] as string[], // Начальное состояние - пустой массив строк
  reducers: {
    /**
     * Добавляет фильм в избранное
     * @function setFavourite
     * @param {string[]} state - Текущее состояние (массив ID фильмов)
     * @param {PayloadAction<string>} action - Действие с ID фильма для добавления
     * @returns {string[]} Новый массив с добавленным ID фильма
     */
    setFavourite: (state, action: PayloadAction<string>) => [
      ...state,
      action.payload,
    ],

    /**
     * Удаляет фильм из избранного
     * @function removeFavourite
     * @param {string[]} state - Текущее состояние (массив ID фильмов)
     * @param {PayloadAction<string>} action - Действие с ID фильма для удаления
     * @returns {string[]} Новый массив без указанного ID фильма
     */
    removeFavourite: (state, action: PayloadAction<string>) =>
      state.filter((id) => id !== action.payload),
  },
});

// Экспорт редьюсера и действий
export const favouriteReducer = favouriteSlice.reducer;
export const { setFavourite, removeFavourite } = favouriteSlice.actions;
