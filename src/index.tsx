import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';                 // Главный компонент приложения
import { store } from './store';         // Redux-хранилище
import './assets/styles/css/index.css';  // Глобальные стили

// Получаем корневой DOM-элемент
const rootElement = document.getElementById('root') as HTMLDivElement;
const root = createRoot(rootElement);

/**
 * Рендер всего приложения с:
 * - StrictMode (для выявления потенциальных проблем)
 * - Redux Provider (для управления состоянием)
 * - BrowserRouter (для маршрутизации)
 */
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
