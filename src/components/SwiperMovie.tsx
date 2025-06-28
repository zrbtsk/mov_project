import { Link } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import lietomeSlider from '@/assets/images/slider_lietome.jpeg';
import dexterSlider from '@/assets/images/slider_dexter.jpeg';
import houseSlider from '@/assets/images/slider_house.jpeg';

/**
 * Компонент слайдера для показа популярных фильмов/сериалов
 * @component
 * @returns {JSX.Element} Возвращает Swiper-слайдер с автопрокруткой, навигацией и пагинацией
 * @description
 * Компонент SwiperMovie реализует:
 * - Автоматическую прокрутку слайдов каждые 3 секунды
 * - Навигацию стрелками
 * - Интерактивную пагинацию
 * - Ссылки на страницы детализации
 * - Адаптивные изображения
 * 
 * @note Особенности конфигурации:
 * - spaceBetween: 0 (слайды вплотную)
 * - centeredSlides: true (центрирование активного слайда)
 * - autoplay: 3000ms с продолжением после взаимодействия
 * - Модули: Autoplay, Navigation, Pagination
 */
export const SwiperMovie = () => {
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Navigation, Pagination]}
      className='homeSwiper'
    >
      <SwiperSlide>
        <Link to='/details/tt1235099'>
          <img
            src={lietomeSlider}
            alt='lietome'
            className='homeSwiper__img'
          />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to='/details/tt0773262'>
          <img
            src={dexterSlider}
            alt='dexter'
            className='homeSwiper__img'
          />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to='/details/tt0412142'>
          <img
            src={houseSlider}
            alt='house'
            className='homeSwiper__img'
          />
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};
