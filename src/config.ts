import axios from 'axios';

// API ключи из переменных окружения
const API_KEY_OMDb = import.meta.env.VITE_API_KEY_1; // Ключ для OMDb API
const API_KEY_KINOPOISK = import.meta.env.VITE_API_KEY_2; // Ключ для Kinopoisk API


/**
 * Экземпляр Axios для работы с API Kinopoisk
 * Используется для поиска фильмов по названию, жанру, рейтингу, стране,году
 */
export const searchAll = axios.create({
  baseURL: 'https://api.kinopoisk.dev', 
  headers: {
    accept: 'application/json',
    'X-API-KEY': `${API_KEY_KINOPOISK}`, // Авторизация через API-ключ
  },
});

/**
 * Генерирует URL для запроса к OMDb API по ID фильма
 * Возвращает расширенную информацию о конкретном фильме
 */
export const searchById = (id: string) =>
  `https://www.omdbapi.com/?apikey=${API_KEY_OMDb}&i=` + id;
