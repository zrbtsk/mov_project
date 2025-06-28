import { RootState } from '../../store';

/**
 * Селектор для получения текущей темы из Redux
 * @returns {ThemeSlice} 'light' | 'dark'
 */
export const selectTheme = (state: RootState) => state.theme;