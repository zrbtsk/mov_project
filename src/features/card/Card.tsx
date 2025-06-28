import { Tooltip } from 'react-tooltip';

import { useCard } from './use-card';
import { useFavourite } from '../favourite/use-favourite';

import noFavouritesIcon from '@/assets/images/icons_noFavourites.png';
import favouritesIcon from '@/assets/images/icon_favouretes.png';
import noFavouritesLightIcon from '@/assets/images/icon_noFavourites-light.svg';
import favouritesLightIcon from '@/assets/images/icon_favourites-light.svg';
import posterUndefined from '@/assets/images/poster__undef.jpeg';


/**
 * Пропсы компонента Card
 * @interface CardProps
 * @property {string} movId - ID фильма (imdbID)
 * @property {Function} onClick - Обработчик клика по карточке
 */
interface CardProps {
  movId: string;
  onClick: () => void;
}

/**
 * Компонент карточки фильма
 * @component
 * @returns {JSX.Element} Возвращает JSX элемент карточки фильма
 */
export const Card = ({ movId, onClick }: CardProps) => {
  const { mov, status, error, theme } = useCard(movId);
  const { handleFavourite, handleRemoveFavourite, favourite } = useFavourite();
  // Отображаем заглушку, если данные фильма не загружены
  if (!mov) {
    return (
      <div className='loading' data-testid={`movie-card-${movId}`} >
        <div className='load'>
          <div className='сontent'></div>
        </div>
      </div>
    );
  }
  return (
    <>
      {/* Сообщение об ошибке */}
      {error && (
        <div className='loading-cantFetchData'>
          <div className='load'>
            <div className='сontent'></div>
          </div>
          <h2>Can`t fetch data</h2>
        </div>
      )}
      {/* Индикатор загрузки */}
      {status === 'loading' && (
        <div className='loading'>
          <div className='load'>
            <div className='сontent'></div>
          </div>
        </div>
      )}
      {/* Отображение карточки фильма */}
      {status === 'received' && mov && (
        <div id={mov.imdbID} className='card' onClick={onClick} data-testid={`movie-card-${movId}`} >
          {/* Постер фильма с обработкой ошибки загрузки */}
          <img
            src={
              mov.Poster !== 'N/A' ? mov.Poster : posterUndefined
            }
            alt='movie'
            className='card__poster'
            onError={(e) => {
              (e.target as HTMLImageElement).src = posterUndefined;
            }}
          />
          {/* Информационная панель */}
          <div className='info'>
            {/* Кнопка удаления из избранного (меняется в зависимости от темы) */}
            {favourite && favourite.includes(mov.imdbID) ? (
                <img
                  src={theme === 'dark' ? favouritesIcon : favouritesLightIcon}
                  alt='favourite'
                  width='21px'
                  height='21px'
                  className='card__icons'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFavourite(mov.imdbID);
                  }}
                  data-tooltip-id='favourite-tooltip'
                  data-tooltip-content='Favourite'
                />
             
            ) : 
              <img
                src={theme === 'dark' ? noFavouritesIcon : noFavouritesLightIcon}
                alt='icons'
                width='21px'
                height='21px'
                className='card__icons'
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavourite(mov.imdbID);
                }}
                data-tooltip-id='favourite-tooltip'
                data-tooltip-content='Favourite'
              />}
            {/* Всплывающая подсказка */}
            <Tooltip id='favourite-tooltip' />
            {/* Рейтинг фильма с цветовым индикатором */}
            <div
              className={`card__rating ${typeof mov.imdbRating === 'number'
                  ? mov.imdbRating <= 7
                    ? 'blue'
                    : 'green'
                  : 'blue'
                }`}
            >
              {mov.imdbRating === 'N/A' ? '-' : mov.imdbRating}
            </div>

            {/* Дополнительная информация (жанр и длительность/сезоны) */}
            <p className='card__other'>
              {mov.Genre}
              {mov.Runtime === 'N/A'
                ? mov.totalSeasons === undefined || mov.totalSeasons === 'N/A'
                  ? ''
                  : ',' + mov.totalSeasons + ' seasons'
                : mov.Runtime === undefined
                  ? ''
                  : ',' + mov.Runtime}
            </p>
          </div>
          {/* Название и год выпуска фильма */}
          <p className='card__title'>
            {mov.Title}, {mov.Year}
          </p>
        </div>
      )}
    </>
  );
};
