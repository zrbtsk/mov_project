import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { selectSwiperInfo, selectSwiperList } from './swiper-select';
import { loadSwiper } from './swiper-slice';
import { RootState, useAppDispatch } from '../../store';
import { CurrentCollection } from '../../types';
import { selectTheme } from '../theme/theme-selector';

/**
 * Пропсы для хука useSwiperCollections
 * @interface useSwiperCollectionsProps
 * @property {string} swiperKey - Уникальный идентификатор слайдера
 * @property {CurrentCollection} collection - Конфигурация коллекции фильмов
 */
export interface useSwiperCollectionsProps {
  swiperKey: string;
  collection: CurrentCollection;
}

/**
 * Кастомный хук для управления коллекциями фильмов в слайдерах
 * @function useSwiperCollections
 * @param {useSwiperCollectionsProps} params - Параметры хука
 * @returns {Object} Объект с данными и состоянием слайдера
 * @returns {string|null} error - Сообщение об ошибке (если есть)
 * @returns {Status} status - Статус загрузки данных
 * @returns {MovieId[]|undefined} currentSwiper - Текущие данные слайдера
 * @returns {ThemeSlice} theme - Текущая тема приложения
 *
 * @example
 * const { error, status, currentSwiper, theme } = useSwiperCollections({
 *   swiperKey: 'top-rated-movies',
 *   collection: {
 *     type: 'movie',
 *     rating: '8-10',
 *     genre: 'drama'
 *   }
 * });
 *
 * @description
 * ## Особенности работы:
 * - Автоматически загружает данные при монтировании, если они отсутствуют
 * - Интегрируется с Redux для управления состоянием
 * - Предоставляет актуальную информацию о статусе загрузки
 * - Возвращает текущую тему приложения для стилизации
 */
export const useSwiperCollections = ({
  swiperKey,
  collection,
}: useSwiperCollectionsProps) => {
  const dispatch = useAppDispatch();
  const theme = useSelector(selectTheme);

  const currentSwiper = useSelector((state: RootState) => selectSwiperList(state, swiperKey));
  const { status, error } = useSelector(selectSwiperInfo);

  /**
 * Эффект для загрузки данных слайдера
 * @effect
 * @listens swiperKey
 * @description
 * - Запускает загрузку только если данные отсутствуют и нет текущего процесса загрузки
 * - Использует переданные параметры коллекции для формирования запроса
 */
  useEffect(() => {
    if (!currentSwiper && status !== 'loading') {

      dispatch(
        loadSwiper({
          type: collection.type,
          rating: collection.rating,
          genre: collection.genre || '',
          swiperKey,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiperKey]);

  return { error, status, currentSwiper, theme };
};
