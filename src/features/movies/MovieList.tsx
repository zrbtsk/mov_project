import { useNavigate } from 'react-router-dom';

import { Preloader } from '../../components/Preloader';
import { Card } from '../card/Card';
import { useMovies } from './use-movies';
import { PaginationButton } from '../../components/PaginationButton';
import { Dispatch, SetStateAction } from 'react';

/**
 * Пропсы компонента MovieList
 * @interface MovieListProps
 * @property {string} search - Поисковый запрос для фильмов
 * @property {number} page - Текущая страница пагинации
 * @property {Dispatch<SetStateAction<number>>} setPage - Функция обновления номера страницы
 */
interface MovieListProps {
  search: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

/**
 * Компонент для отображения списка фильмов по поисковому запросу
 * @component
 * @param {MovieListProps} props - Пропсы компонента
 * @returns {JSX.Element} Возвращает JSX-элемент списка фильмов с пагинацией
 * 
 * @example
 * <MovieList search="batman" page={1} setPage={setPage} />
 */
export const MovieList = ({ search, page, setPage }: MovieListProps) => {
  const navigate = useNavigate();

  // Получаем данные и методы из хука useMovies
  const { error, status, hasMore, handleLoadMoreMovie, list } = useMovies({
    search,
    page,
    setPage,
  });

  return (
    <>
      {/* Сообщение об ошибке */}
      {error && <h2>Can`t fetch data</h2>}

      {/* Прелоадер во время загрузки */}
      {status === 'loading' && <Preloader />}

      {/* Список фильмов после успешной загрузки */}
      {status === 'received' && list?.length > 0 && (
        <div className='movieList'>
          {list.map((movie) => {
            const movId = movie.externalId?.imdb;
            // Пропускаем фильмы без IMDB ID
            if (!movId) return null;
            return (
              <Card
                key={movId}
                movId={movId}
                onClick={() => navigate(`/details/${movId}`)}
              />
            );
          })}
        </div>
      )}
      {/* Кнопка пагинации */}
      <PaginationButton
        onClick={handleLoadMoreMovie}
        status={status}
        hasMore={hasMore}
        error={error}
      />
    </>
  );
};