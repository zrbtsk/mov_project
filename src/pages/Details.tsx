import { useParams } from 'react-router-dom';

import { Button } from '../components/Button';
import { useCard } from '../features/card/use-card';
import { useFavourite } from '../features/favourite/use-favourite';

import noFavouritesIcon from '@/assets/images/icons_noFavourites.png';
import favouritesIcon from '@/assets/images/icon_favouretes.png';
import noFavouritesLightIcon from '@/assets/images/icon_noFavourites-light.svg';
import favouritesLightIcon from '@/assets/images/icon_favourites-light.svg';
import posterUndefined from '@/assets/images/poster__undef.jpeg';

/**
 * Страница детальной информации
 * @component
 * @returns {JSX.Element} Возвращает страницу с детальной информацией о фильме
 * @description
 * Компонент страницы деталей с особенностями:
 * - Получает ID фильма из параметров URL
 * - Отображает полную информацию о фильме (постер, название, рейтинг, жанры, описание)
 * - Поддерживает добавление/удаление из избранного
 * - Адаптируется под текущую тему приложения
 * - Обрабатывает состояния загрузки и ошибок
 */
export const Details = () => {
  const { id = '' } = useParams();

  // Получение данных фильма и состояния загрузки
  const { mov, status, error, theme } = useCard(id);

  // Работа с избранным
  const { favourite, handleFavourite, handleRemoveFavourite } = useFavourite();

  // Обработка отсутствия данных
  if (!mov) {
    return (
      <div className='load'>
        <div className='content'></div>
      </div>
    );
  }

  // Преобразование строки жанров в массив
  const genreString = mov.Genre;
  const genreArray = genreString.split(', ').filter((genre) => genre);

  return (
    <>
      {/* Кнопка возврата */}
      <Button />

      {/* Сообщение об ошибке */}
      {error && <h2>Can`t fetch data</h2>}

      {/* Индикатор загрузки */}
      {status === 'loading' && (
        <div className='load'>
          <div className='content'></div>
        </div>
      )}

      {/* Детальная информация о фильме */}
      {status === 'received' && (
        <div className='details'>
          {/* Постер фильма */}
          <img
            src={
              mov.Poster !== 'N/A' ? mov.Poster : posterUndefined
            }
            alt='movie'
            className='details__img'
            onError={(e) => {
              (e.target as HTMLImageElement).src = posterUndefined;
            }}
          />

          {/* Основная информация */}
          <div className='details__content'>

            {/* Название и кнопка избранного */}
            <h1 className='details__content__h'>{mov.Title}</h1>
            {favourite.includes(mov.imdbID) ? (
                <img
                  src={theme === 'dark' ? favouritesIcon : favouritesLightIcon}
                  alt='icons'
                  width='21px'
                  height='21px'
                  className='details__content__favourite'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFavourite(mov.imdbID);
                  }}
                />
            ) : 
              <img
                src={theme === 'dark' ? noFavouritesIcon : noFavouritesLightIcon}
                alt='icons'
                width='21px'
                height='21px'
                className='details__content__favourite'
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavourite(mov.imdbID);
                }}
              />}

            {/* Рейтинг и жанры */}
            <div className='details__content__info'>
              <div
                className={`details__content__rating ${typeof mov.imdbRating === 'number'
                  ? mov.imdbRating <= 7
                    ? 'blue'
                    : 'green'
                  : 'blue'
                  }`}
              >
                {mov.imdbRating === 'N/A' ? '-' : mov.imdbRating}
              </div>
              {/* Список жанров */}
              {genreArray.map((genre) => (
                <div className='details__content__genre' key={genre}>{genre}</div>
              ))}
            </div>
            {/* Описание фильма */}
            <p className='details__content__plot'>
              {mov.Plot === 'N/A' ? '' : mov.Plot}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
