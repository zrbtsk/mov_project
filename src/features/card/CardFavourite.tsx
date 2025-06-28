import { Tooltip } from 'react-tooltip';

import { useCard } from './use-card';
import { useFavourite } from '../favourite/use-favourite';

import trashLightIcon from '@/assets/images/icon_trash-light.svg';
import trashIcon from '@/assets/images/icon_trash.png';
import posterUndefined from '@/assets/images/poster__undef.jpeg';


/**
 * Пропсы компонента CardFavourite
 * @interface CardFavouriteProps
 * @property {string} movId - ID фильма (imdbID)
 * @property {Function} onClick - Обработчик клика по карточке
 */
interface CardFavouriteProps {
  movId: string;
  onClick: () => void;
}

/**
 * Компонент карточки фильма для раздела избранного
 * @component
 * @returns {JSX.Element} Возвращает JSX элемент карточки фильма с функцией удаления
 */
export const CardFavourite = ({ movId, onClick }: CardFavouriteProps) => {
  const { mov, status, error, theme } = useCard(movId);
  const { handleRemoveFavourite } = useFavourite();

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
        <div className='load'>
          <div className='content'></div>
        </div>
      )}

      {/* Отображение карточки фильма */}
      {status === 'received' && (
        <div id={mov.imdbID} className='card' onClick={onClick}>
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
            {theme === 'dark' ? (
              <img
                src={trashIcon}
                alt='icons'
                width='21px'
                height='21px'
                className='card__icons'
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFavourite(mov.imdbID);
                }}
                data-tooltip-id='trash-tooltip'
                data-tooltip-content='Delete'
              />
            ) : (
              <img
                src={trashLightIcon}
                alt='icons'
                width='21px'
                height='21px'
                className='card__icons'
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFavourite(mov.imdbID);
                }}
                data-tooltip-id='trash-tooltip'
                data-tooltip-content='Delete'
              />
            )}
            {/* Всплывающая подсказка */}
            <Tooltip id='trash-tooltip' />
            {/* Рейтинг фильма с цветовым индикатором */}
            <div
              className={`card__rating ${typeof mov.imdbRating === 'number'
                  ? mov.imdbRating <= 7
                    ? 'blue'
                    : 'green'
                  : 'blue'
                }`}
            >
              {mov.imdbRating}
            </div>

            {/* Дополнительная информация (жанр и длительность/сезоны) */}
            <p className='card__other'>
              {mov.Genre},
              {mov.Runtime === 'N/A'
                ? mov.totalSeasons + ' seasons'
                : mov.Runtime}
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
