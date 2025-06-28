import { useNavigate, useParams } from 'react-router-dom';

import { Card } from '../features/card/Card';
import { Preloader } from '../components/Preloader';
import { usePagination } from '../features/navigate/use-pagination';
import { HeaderBar } from '../components/HeaderBar';
import { PaginationButton } from '../components/PaginationButton';

/**
 * Компонент страницы с фильмами определенного типа.
 * 
 * @module TypePage
 * @description Отображает список фильмов/сериалов заданного типа с пагинацией.
 * Поддерживает загрузку дополнительных элементов, отображение состояния загрузки
 * и обработку ошибок. Позволяет переходить на страницу деталей фильма.
 * 
 * @returns {JSX.Element} Возвращает JSX-разметку страницы с фильмами.
 */
export const TypePage = () => {
  const navigate = useNavigate();
  const { type = '' } = useParams();

  const { page, movies, status, error, hasMore, handleLoadMore } =
    usePagination(type);

  return (
    <>
      <HeaderBar type={type} />
      {error && <h2>Can`t fetch data</h2>}
      {status === 'loading' && page === 1 && <Preloader />}
      {status === 'received' && movies?.length > 0 && (
        <div className='movieList'>
          {movies.map((movie) => {
            const movId = movie.externalId.imdb || '';
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
      <PaginationButton
        onClick={handleLoadMore}
        status={status}
        hasMore={hasMore}
        error={error}
      />
    </>
  );
};
