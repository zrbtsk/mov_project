import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectTheme } from '../features/theme/theme-selector';

import backIcon from '@/assets/images/icon_back.png';
import backLightIcon from '@/assets/images/icon_back-light.svg';

/**
 * Кнопка "Назад" с адаптивным иконками под текущую тему
 * @component
 * @returns {JSX.Element} Возвращает кнопку с иконкой и текстом "Back"
 * 
 * @example
 * // Использование компонента
 * <Button />
 * 
 * @description
 * Компонент кнопки "Назад" с следующими особенностями:
 * - Автоматически адаптирует иконку под текущую тему (темная/светлая)
 * - При клике возвращает на предыдущую страницу с помощью react-router
 * - Имеет доступные атрибуты для улучшения UX
 */
export const Button = () => {
  const navigate = useNavigate();
  const theme = useSelector(selectTheme);

  return (
    <button className='btn' onClick={() => navigate(-1)}>
      {/* Условный рендеринг иконки в зависимости от темы */}
      {theme === 'dark' ? (
        <img
          src={backIcon}
          alt='back'
          width='16px'
          height='12px'
          className='icon_back'
        />
      ) : (
        <img
          src={backLightIcon}
          alt='back'
          width='16px'
          height='12px'
          className='icon_back'
        />
      )}
      Back
    </button>
  );
};
