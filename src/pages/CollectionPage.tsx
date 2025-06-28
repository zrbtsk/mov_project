import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Card } from '../features/card/Card';
import { selectSwiperList } from '../features/swiper/swiper-select';
import { RootState } from '../store';

/**
 * Страница коллекции фильмов/сериалов/мультфильмов
 * @component
 * @returns {JSX.Element} Возвращает страницу с коллекцией карточек фильмов
 * @description
 * Компонент страницы коллекции с особенностями:
 * - Отображает коллекцию по переданному ID
 * - Использует параметры URL для идентификации коллекции
 * - Показывает название коллекции
 * - Отображает карточки фильмов в сетке
 * - Поддерживает навигацию к деталям фильма
 */
export const CollectionPage = () => {
  // Получение параметров из URL
  const { swiperid = '', name } = useParams();
  const navigate = useNavigate();

  // Получение данных коллекции из Redux store
  const currentSwiper = useSelector((state: RootState) =>
    selectSwiperList(state, swiperid)
  );

  return (
    <>
      {/* Название коллекции */}
      <h1 className='favourite__text'>{name}</h1>

      {/* Список карточек фильмов */}
      <div className='movieList'>
        {currentSwiper.map((movie) => {
          const movId = movie.externalId.imdb || '';
          return (
            <Card
              key={movId}
              movId={movId}
              onClick={() => navigate(`/details/${movId}`)}
            />
          );
        })}
      </div>
    </>
  );
};
