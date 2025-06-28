import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// Импорт редьюсеров из отдельных модулей
import { moviesReducer } from './features/movies/movies-slice';
import { swiperReducer } from './features/swiper/swiper-slice';
import { navigateReducer } from './features/navigate/navigate-slice';
import { filterReducer } from './features/filter/filter-slice';
import { favouriteReducer } from './features/favourite/favourite-slice';
import { themeReducer } from './features/theme/theme-slice';
import { autorizationReducer } from './features/autorization/autorization-slice';
import { cardReducer } from './features/card/card-slice';

/**
 * Корневой редьюсер, объединяющий все редьюсеры приложения.
 * Каждый редьюсер управляет своей частью состояния.
 */
export const rootReducer = combineReducers({
  movies: moviesReducer,                // Управление состоянием фильмов
  card: cardReducer,                    // Управление состоянием карточки фильма с данными
  swiper: swiperReducer,                // Состояние свайпера/карусели
  navigate: navigateReducer,            // Навигационные состояния
  filter: filterReducer,                // Параметры фильтрации
  favourite: favouriteReducer,          // Избранные элементы
  theme: themeReducer,                  // Тема приложения (светлая/тёмная)
  autorization: autorizationReducer,    // Авторизация пользователя
});

/**
 * Основное хранилище Redux с включенными devTools для разработки
 */
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,  // Включить Redux DevTools только в development
});

export type RootState = ReturnType<typeof store.getState>;   // Тип всего состояния

/**
 * Типизированная версия хука useDispatch
 */
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;