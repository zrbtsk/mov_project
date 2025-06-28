import { useSelector } from 'react-redux';
import { selectTheme } from '../features/theme/theme-selector';

import flowerLight from '@/assets/images/flower-light.png';
import flowerDark from '@/assets/images/flower.png';

/**
 * Декоративный компонент с цветочными элементами, адаптирующийся под текущую тему
 * @component
 * @returns {JSX.Element} Возвращает набор декоративных цветочных элементов
 * @description
 * Компонент отображает набор декоративных цветков с разными размерами:
 * - small (30px)
 * - middle (60px)
 * - big (100px)
 * - huge (200px)
 */
export const CustomFlower = () => {
  const theme = useSelector(selectTheme);

  // Массив данных для цветочных элементов
  const flowers = [
    { size: 'small', className: 'flowerOne', width: 30 },
    { size: 'middle', className: 'flowerTwo', width: 60 },
    { size: 'small', className: 'flowerTree', width: 30 },
    { size: 'middle', className: 'flowerFour', width: 60 },
    { size: 'small', className: 'flowerFive', width: 30 },
    { size: 'big', className: 'flowerSix', width: 100 },
    { size: 'big', className: 'flowerSeven', width: 100 },
    { size: 'huge', className: 'flowerEihgt', width: 200 },
    { size: 'big', className: 'flowerNine', width: 100 }
  ];
  return (
    <>
      {flowers.map((flower, index) => (
        <img
          key={`${flower.className}-${index}`}
          src={theme === 'dark' ? flowerDark : flowerLight}
          alt="Decorative flower element"
          className={`autorization__background__flower--${flower.size} ${flower.className}`}
          width={`${flower.width}px`}
          aria-hidden="true"
          role="presentation"
        />
      ))}
    </>
  );
};
