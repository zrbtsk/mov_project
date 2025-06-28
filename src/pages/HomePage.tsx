import { SwiperCollections } from '../features/swiper/SwiperCollections';
import { ModalBox } from '../components/ModalBox';
import { SwiperMovie } from '../components/SwiperMovie';
import { CurrentCollection } from '../types';

/**
 * Компонент домашней страницы приложения.
 * 
 * @module HomePage
 * @description Главная страница, содержащая коллекции фильмов/сериалов в виде свайперов.
 * Включает модальное окно, свайпер с популярными фильмами и несколько тематических коллекций.
 * 
 * @returns {JSX.Element} Возвращает JSX-разметку домашней страницы.
 */
export const HomePage = () => {
  /**
 * Массив объектов с параметрами коллекций для отображения.
 * @type {CurrentCollection[]}
 * @property {string} name - Название коллекции.
 * @property {string} type - Тип контента в коллекции (cartoon, tv-series, movie).
 * @property {string} rating - Рейтинг контента (в формате '8-10').
 * @property {string} [genre] - Необязательный жанр для фильтрации.
 */
  const optionsCollections: CurrentCollection[] = [
    {
      name: 'Best animation',
      type: 'cartoon',
      rating: '8-10',
    },
    {
      name: 'Best series',
      type: 'tv-series',
      rating: '8-10',
    },
    {
      name: 'Best movies',
      type: 'movie',
      rating: '8-10',
    },
    {
      name: 'Best detective series',
      type: 'tv-series',
      rating: '8-10',
      genre: 'детектив',
    },
    {
      name: 'Best comedy movies',
      type: 'tv-series',
      rating: '8-10',
      genre: 'комедия',
    },
  ];

  return (
    <>
      <ModalBox />
      <SwiperMovie />
      {optionsCollections.map((collection) => {
        /**
 * Генерация уникального ключа для коллекции.
 * Если есть жанр - включает тип, рейтинг и жанр.
 * Если жанра нет - только тип и рейтинг.
 */
        const key = collection.genre
          ? `${collection.type}-${collection.rating}-${collection.genre}`
          : `${collection.type}-${collection.rating}`;
        return (
          <div key={key} className='collections'>
            <h2 className='collections__title'>{collection.name}</h2>
            <SwiperCollections
              key={key}
              collection={collection}
              swiperKey={key}
            />
          </div>
        );
      })}
    </>
  );
};
