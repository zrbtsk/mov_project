import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Autoplay,
  Virtual,
  Mousewheel,
  FreeMode,
} from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Card } from '../card/Card';
import { Preloader } from '../../components/Preloader';
import { useSwiperCollections } from './use-swiperCollections';
import { CurrentCollection } from '../../types';

import leftLightIcon from '@/assets/images/icon_left-light.svg';
import leftIcon from '@/assets/images/icon_left.png';
import rightLightIcon from '@/assets/images/icon_right-light.svg';
import rightIcon from '@/assets/images/icon_right.png';
/**
 * Свойства компонента SwiperCollections
 * @interface SwiperCollectionsProps
 * @property {string} swiperKey - Уникальный идентификатор слайдера
 * @property {CurrentCollection} collection - Конфигурация коллекции фильмов
 */
interface SwiperCollectionsProps {
  swiperKey: string;
  collection: CurrentCollection;
}

/**
 * Компонент слайдера для отображения коллекций фильмов
 * @component
 * @param {SwiperCollectionsProps} props - Свойства компонента
 * @returns {JSX.Element} Слайдер с коллекцией фильмов
 *
 * @example
 * <SwiperCollections 
 *   swiperKey="top-rated" 
 *   collection={{ type: 'movie', rating: '8-10', name: 'top-rated' }} 
 * />
 *
 * @description
 * ## Особенности реализации:
 * - Использует библиотеку Swiper для создания интерактивного слайдера
 * - Поддерживает навигацию, автопрокрутку и адаптивный дизайн
 * - Интегрируется с Redux через кастомный хук useSwiperCollections
 * - Автоматически загружает данные при монтировании
 * - Поддерживает две цветовые темы (светлую и темную)
 * - Предоставляет возможность перехода к детальной странице
 */
export const SwiperCollections = ({ swiperKey, collection }: SwiperCollectionsProps) => {
  const navigate = useNavigate();
  const { error, status, currentSwiper, theme } = useSwiperCollections({ swiperKey, collection });

  return (
    <>
      {error && <h2>Can`t fetch data</h2>}
      {status === 'loading' && <Preloader />}
      {status === 'received' && currentSwiper?.length > 0 && (
        <div className='customSwiper' data-testid='customSwiper'>
          {/* Кнопка навигации "Назад" */}
          {theme === 'dark' ? (
            <img
              src={leftIcon}
              alt='left'
              className='custom-prev-btn'

            />
          ) : (
            <img
              src={leftLightIcon}
              alt='left-light'
              className='custom-prev-btn'
            />
          )}
          {/**
           * Основной компонент слайдера
           * @type {JSX.Element}
           * @property {Array} modules - Используемые модули Swiper
           * @property {Object} navigation - Конфигурация навигации
           * @property {string} touchEventsTarget - Цель touch-событий
           * @property {boolean} freeMode - Режим свободного скролла
           * @property {string} slidesPerView - Количество видимых слайдов
           * @property {number} spaceBetween - Расстояние между слайдами
           */}
          <Swiper
            modules={[Navigation, Autoplay, Virtual, Mousewheel, FreeMode]}
            navigation={{
              prevEl: '.custom-prev-btn',
              nextEl: '.custom-next-btn',
            }}
            // Настройки для touch-свайпа:
            touchEventsTarget='container'
            touchRatio={1}
            touchAngle={45}
            simulateTouch={true}
            allowTouchMove={true}
            //настроили прокрутку
            freeMode={true}
            slidesPerView='auto'
            slidesPerGroup={3}
            grabCursor={true}
            spaceBetween={24}
            breakpoints={{
              768: {},
            }}
            className='collectionSwiper'
            role='swiper'
          >
            {currentSwiper.map((movie) => {
              const movId = movie.externalId.imdb || '';
              return (
                <SwiperSlide key={movId}>
                  <Card
                    data-testid='navigateInCard'
                    key={movId}
                    movId={movId || ''}
                    onClick={() => navigate(`/details/${movId}`)}
                  />
                </SwiperSlide>
              );
            })}

            {/**
             * Слайд "Показать еще"
             * @type {JSX.Element}
             */}
            <SwiperSlide key='more'>
              <div
                className='more-block'
                onClick={() =>
                  navigate(`/collection/${collection.name}/${swiperKey}`)
                }
              >
                Show more
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Кнопка навигации "Вперед" */}
          {theme === 'dark' ? (
            <img
              src={rightIcon}
              alt='right'
              width='44px'
              className='custom-next-btn'
            />
          ) : (
            <img
              src={rightLightIcon}
              alt='right-light'
              width='44px'
              className='custom-next-btn'
            />
          )}
        </div>
      )}
    </>
  );
};
