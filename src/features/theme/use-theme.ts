import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { setTheme } from './theme-slice';
import { selectTheme } from './theme-selector';
import { useAppDispatch } from '../../store';

/**
 * Кастомный хук для управления темой приложения.
 * @module useTheme
 * @returns {Object} Объект с текущей темой и функцией переключения.
 * @property {ThemeSlice} theme - Текущая тема ('light' или 'dark').
 * @property {Function} toggleTheme - Функция переключения темы.
 * 
 * @example
 * // Использование в компоненте:
 * const { theme, toggleTheme } = useTheme();
 * 
 * <button onClick={toggleTheme}>
 *   Текущая тема: {theme}
 * </button>
 */
export const useTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useSelector(selectTheme);

  /**
   * Переключает тему между 'light' и 'dark'.
   * @function toggleTheme
   * @memberof useTheme
   * @inner
   * @returns {void} Ничего не возвращает, но диспатчит действие изменения темы.
   */
  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  /**
 * Эффект для синхронизации темы с DOM и localStorage.
 * @effect
 * @listens theme
 * @memberof useTheme
 * @inner
 * @description
 * 1. Устанавливает атрибут data-theme на корневом HTML-элементе
 * 2. Сохраняет текущую тему в localStorage
 */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, toggleTheme };
};
