import { useTheme } from './use-theme';
import sunIcon from '@/assets/images/icon_sun.png';
import moonIcon from '@/assets/images/icon_moon.svg';

/**
 * Компонент переключателя темы между светлым и тёмным режимами.
 * @component
 * @returns {JSX.Element} Возвращает кнопку переключения темы с иконкой и текстовой меткой.
 *
 * @example
 * <Theme />
 *
 * @description
 * ## Особенности реализации:
 * - Получает текущую тему и функцию переключения через кастомный хук useTheme
 * - Поддерживает управление с клавиатуры (tabIndex, role="button")
 * - Соответствует стандартам доступности (ARIA-атрибуты)
 * - Использует оптимизированные статические assets
 * - Автоматически обновляет иконку и текст в зависимости от текущей темы
 */
export const Theme = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  /**
   * Данные для отображения в зависимости от текущей темы
   * @type {Object}
   * @property {string} icon - Путь к иконке
   * @property {string} altText - Альтернативный текст для иконки
   * @property {string} label - Текстовая метка темы
   */
  const themeData = {
    icon: isDarkMode ? sunIcon : moonIcon,
    altText: isDarkMode ? 'sun' : 'moon',
    label: isDarkMode ? 'Light Mode' : 'Dark Mode',
  };

  return (

    <div
      className='theme'
      onClick={toggleTheme}
      role="button"
      aria-pressed={isDarkMode}
      tabIndex={0}
    >
      <img
        src={themeData.icon}
        alt={themeData.altText}
        width='18px'
        height='18px'
        className='theme__icon'
      />
      <p className='theme__text'>{themeData.label}</p>

    </div>
  );
};
