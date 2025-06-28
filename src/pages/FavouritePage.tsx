import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CardFavourite } from '../features/card/CardFavourite';
import { selectFavourite } from '../features/favourite/favourite-selector';

/**
 * Страница избранных фильмов пользователя
 * @component
 * @returns {JSX.Element} Возвращает страницу с коллекцией избранных фильмов
 * @description
 * Компонент страницы избранного с особенностями:
 * - Отображает все фильмы, добавленные пользователем в избранное
 * - Показывает заглушку, если избранных фильмов нет
 * - Поддерживает навигацию к деталям фильма
 * - Использует специализированный компонент карточки для избранного
 */
export const FavouritePage = () => {
  // Получаем список ID избранных фильмов из Redux store
  const favourite = useSelector(selectFavourite);
  const navigate = useNavigate();

  return (
    <>
      <h1 className='favourite__text'>Favorites</h1>
      {favourite.length > 0 ? (
        // Список избранных фильмов
        <div className='movieList'>
          {favourite.map((id) => (
            <CardFavourite
              key={id}
              movId={id}
              onClick={() => navigate(`/details/${id}`)}
            />
          ))}
        </div>
      ) : (
        // Заглушка для пустой коллекции
        <div className='favourite__bg'>Your favorite movies will be here</div>
      )}
    </>
  );
};
