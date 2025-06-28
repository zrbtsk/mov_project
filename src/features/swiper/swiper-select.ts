import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { Collections } from '../../types';

/**
 * Получает фильмы слайдера по ключу
 * @param {string} key - Ключ слайдера
 * @returns {MovieId[] | undefined}
 */
export const selectSwiperList = createSelector(
  (state: RootState) => state.swiper.collections,
  (state: RootState, key: string) => key,
  (collections: Collections, key: string) => collections[key]
);

/**
 * Возвращает статус и ошибку слайдеров
 * @returns {{status: Status, error: string|null}}
 */
export const selectSwiperInfo = createSelector(
  (state: RootState) => state.swiper,
  (swiper) => ({
    status: swiper.status,
    error: swiper.error,
  })
);
