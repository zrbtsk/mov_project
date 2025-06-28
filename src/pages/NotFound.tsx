import { useSelector } from 'react-redux';
import { selectTheme } from '../features/theme/theme-selector';

import flower from '@/assets/images/flower.png';
import flowerLight from '@/assets/images/flower-light.png';

/**
 * Компонент для отображения страницы "404 Not Found".
 * 
 * @module NotFound
 * @description Компонент отображает стилизованную страницу 404 с анимированными элементами.
 * Внешний вид меняется в зависимости от текущей темы приложения (светлая/темная).
 * 
 * @returns {JSX.Element} Возвращает JSX-разметку страницы 404.
 */
export const NotFound = () => {
  const theme = useSelector(selectTheme);
  return (
    <div className='notFound'>
      <h1 className='notFound__text textOne'>4</h1>
      {theme === 'dark' ? (
        <img
          src={flower}
          alt='flower'
          className='notFound__flower'
        />
      ) : (
        <img
          src={flowerLight}
          alt='flower'
          className='notFound__flower'
        />
      )}

      <h1 className='notFound__text textTwo'>4</h1>
      <p className='notFound__p'>Page not found</p>
    </div>
  );
};
