import { Route, Routes } from 'react-router-dom';

// Компоненты макета
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Страницы приложения
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { Details } from './pages/Details';
import { TypePage } from './pages/TypePage';
import { AuthorizationPage } from './pages/AuthorizationPage';
import { FavouritePage } from './pages/FavouritePage';
import { CollectionPage } from './pages/CollectionPage';
import { NotFound } from './pages/NotFound';

/**
 * Главный компонент приложения с маршрутизацией.
 * Определяет все возможные пути и соответствующие им страницы.
 *
 * Структура:
 * 1. Header - общий для всех страниц
 * 2. Main content с роутами
 * 3. Footer - общий для всех страниц
 */

function App() {
  return (
    <>
      <Header />
      <main className='page'>
        <Routes>
          {/* Основные маршруты */}
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<SearchPage />} />

          {/* Динамические маршруты */}
          <Route path='/type/:type/*' element={<TypePage />} />
          <Route path='/details/:id' element={<Details />} />

          {/* Авторизация и пользовательские данные */}
          <Route path='/autorization' element={<AuthorizationPage />} />
          <Route path='/favourite' element={<FavouritePage />} />
          <Route
            path='/collection/:name/:swiperid'
            element={<CollectionPage />}
          />

          {/* Обработка несуществующих путей */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
