import { useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { act } from 'react';

import { useTheme } from '../use-theme'; 
import { renderHookWithRouter } from 'src/test-utils/testing';
import { useAppDispatch } from '../../../store';
import { setTheme, ThemeSlice, themeReducer } from '../theme-slice';

jest.mock('../../../store', () => ({
  ...jest.requireActual('../../../store'),
  useAppDispatch: jest.fn(),
}));

 jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const createTestStore = (preloadedState?: { theme: ThemeSlice }) => {
  return configureStore({
    reducer: { theme: themeReducer },
    preloadedState,
  });
};

describe('useTheme', () => {
  let mockDispatch: jest.Mock;
  let store: ReturnType<typeof createTestStore>;
  const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;

  beforeEach(() => {
      mockDispatch = jest.fn((action) => { store.dispatch(action); });
     store = createTestStore({ theme: 'dark' }); 
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    mockUseSelector.mockImplementation((selector) => selector(store.getState()));
  });

  afterEach(() => {
   jest.clearAllMocks();
    localStorage.clear();
    store.dispatch(setTheme('dark')); 
  });
  
  it('should return current theme from store', () => {
    const { result } = renderHookWithRouter(() => useTheme());
    expect(result.current.theme).toBe('dark'); 
  });

   it('should toggle theme and update store', () => {
    const { result } = renderHookWithRouter(() => useTheme());
    
    result.current.toggleTheme(); 
    
    expect(store.getState().theme).toBe('light');
  });

  it('should update localStorage and data-theme attribute', () => {
    const { rerender } = renderHookWithRouter(() => useTheme());
    
    // Проверяем начальные эффекты
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    // Меняем тему в store и триггерим перерисовку
    store.dispatch(setTheme('light'));
    rerender();

    // Проверяем обновленные эффекты
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

    it('should switch from dark to light theme', () => {
      // Arrange
      store = createTestStore({ theme: 'dark' });
      mockUseSelector.mockImplementation((selector) => selector(store.getState()));
      
      const { result } = renderHookWithRouter(() => useTheme());
      
      // Act
      act(() => {
        result.current.toggleTheme();
      });
      
      // Assert
      expect(mockDispatch).toHaveBeenCalledWith(setTheme('light'));
      expect(store.getState().theme).toBe('light');
    });

    it('should switch from light to dark theme', () => {
      // Arrange
      store = createTestStore({ theme: 'light' });
      mockUseSelector.mockImplementation((selector) => selector(store.getState()));
      
      const { result } = renderHookWithRouter(() => useTheme());
      
      // Act
      act(() => {
        result.current.toggleTheme();
      });
      
      // Assert
      expect(mockDispatch).toHaveBeenCalledWith(setTheme('dark'));
      expect(store.getState().theme).toBe('dark');
    });
});