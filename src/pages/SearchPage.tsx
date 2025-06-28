import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Button } from '../components/Button';
import { MovieList } from '../features/movies/MovieList';
import { Search } from '../features/search/Search';

/**
 * Компонент страницы поиска фильмов.
 * 
 * @module SearchPage
 * @description Предоставляет интерфейс для поиска фильмов с возможностью пагинации.
 * Включает поле поиска, отображение текущего поискового запроса и список найденных фильмов.
 * 
 * @returns {JSX.Element} Возвращает JSX-разметку страницы поиска.
 */
export const SearchPage = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  return (
    <>
      <Button />
      <h1 className='search__h1'>Search by `{search}`</h1>
      <Search search={search} setSearch={setSearch} setPage={setPage} />
      <MovieList search={search} page={page} setPage={setPage} />
    </>
  );
};
