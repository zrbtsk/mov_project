import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Тип, представляющий возможные темы приложения.
 * @typedef {'light' | 'dark'} ThemeSlice
 */
export type ThemeSlice = 'light' | 'dark';

/**
 * Создает Redux-слайс для управления темой приложения.
 * @module themeSlice
 * @property {string} name - Уникальное имя слайса ('@@theme').
 * @property {ThemeSlice} initialState - Начальное состояние (по умолчанию 'dark').
 * @property {Object} reducers - Объект редьюсеров.
 * @property {Function} reducers.setTheme - Редьюсер для установки темы.
 */
const themeSlice = createSlice({
  name: '@@theme',
  initialState: 'dark' as ThemeSlice,
  reducers: {
    /**
 * Устанавливает новую тему приложения.
 * @function setTheme
 * @param {ThemeSlice} _ - Неиспользуемый параметр состояния (заменяется новым значением).
 * @param {PayloadAction<ThemeSlice>} action - Action с новой темой в payload.
 * @returns {ThemeSlice} Новое состояние темы.
 * @example
 * dispatch(setTheme('light')); // Переключает на светлую тему
 */
    setTheme: (_, action: PayloadAction<ThemeSlice>) => action.payload,
  },
});

/**
 * Action creator для установки темы.
 * @memberof themeSlice
 * @type {Function}
 */
export const { setTheme } = themeSlice.actions;

/**
 * Редьюсер для управления темой приложения.
 * @memberof themeSlice
 * @type {Reducer<ThemeSlice>}
 */
export const themeReducer = themeSlice.reducer;
