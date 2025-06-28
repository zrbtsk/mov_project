import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { act } from 'react';

import { themeReducer, ThemeSlice } from '../../theme/theme-slice';
import { loadSwiper, swiperReducer, SwiperSlice } from '../swiper-slice';
import { RootState, useAppDispatch } from '../../../store';
import { useSwiperCollections, useSwiperCollectionsProps } from '../use-swiperCollections';
import { renderHookWithRouter } from 'src/test-utils/testing';

jest.mock('../../../store', () => ({
  ...jest.requireActual('../../../store'),
  useAppDispatch: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('../swiper-slice', () => ({
  ...jest.requireActual('../swiper-slice'),
  loadSwiper: jest.fn().mockReturnValue(async (dispatch: any) => {
    dispatch({ type: 'LOAD_SWIPER_PENDING' });
    return Promise.resolve().then(() => 
      dispatch({ 
        type: 'LOAD_SWIPER_FULFILLED', 
        payload: { data: [], key: 'test-key' } 
      })
    );
  }),
}));

jest.mock('../swiper-select', () => ({
  selectSwiperList: jest.fn().mockImplementation(
    (state: RootState, key: string) => state.swiper.collections[key]
  ),
  selectSwiperInfo: jest.fn().mockImplementation(
    (state: RootState) => ({
      status: state.swiper.status,
      error: state.swiper.error
    })
  )
}));

const createTestStore = (preloadedState?: { theme: ThemeSlice, swiper: SwiperSlice }) => {
  return configureStore({
    reducer: { 
      theme: themeReducer,
      swiper: swiperReducer,
    },
    preloadedState,
  });
};

const mockProps: useSwiperCollectionsProps = {
    swiperKey: 'Best comedy movies',
    collection: {
      name: 'Best comedy movies',
      type: 'tv-series',
      rating: '8-10',
      genre: 'комедия',
    }
};

describe('useSwiperCollections', () => {
  let store: ReturnType<typeof createTestStore>;
  let mockDispatch: jest.Mock;
  const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
  const mockLoadSwiper = loadSwiper as jest.MockedFunction<typeof loadSwiper>;

  beforeEach(() => {
     mockUseSelector.mockClear();
    store = createTestStore({ 
      theme: 'dark',
      swiper: {
        status: 'idle',
        error: null,
        collections: {}
      }
    });
    mockDispatch = jest.fn((action) => {
      if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
      }
      return store.dispatch(action);
    });
    
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch loadSwiper when conditions are met', async () => {
    mockUseSelector.mockImplementation((selector) => {
      const mockState = {
        theme: 'dark',
        swiper: {
          status: 'idle',
          error: null,
          collections: {} // Пустые коллекции
        }
      };
      return selector(mockState);
    });
    
  const { result } = await act(async () => {
    return renderHookWithRouter(() => useSwiperCollections(mockProps));
  });

    expect(mockDispatch).toHaveBeenCalledTimes(1); 
    expect(mockLoadSwiper).toHaveBeenCalledWith({
      type: 'tv-series',
      rating: '8-10',
      genre: 'комедия',
      swiperKey: 'Best comedy movies'
    });
    expect(result.current).toEqual({
    error: null,
    status: 'idle', // или 'loading', зависит от реализации
    currentSwiper: undefined,
    theme: 'dark'
  });
  });
  // Когда данные уже есть
it('should NOT dispatch when currentSwiper exists', async () => {
    mockUseSelector.mockImplementation((selector) => {
      const mockState = {
        theme: 'dark',
        swiper: {
          status: 'received',
          error: null,
          collections: { 'Best comedy movies' : [
  { externalId: { imdb: 'tywyy34', tmdb: 1234, kpHD: 'sdf' } },
]} 
        }
      };
      return selector(mockState);
    });

  const { result } = await act(async () => {
    return renderHookWithRouter(() => useSwiperCollections(mockProps));
  });

    expect(mockDispatch).not.toHaveBeenCalled(); 
        expect(result.current).toEqual({
    error: null,
    status: 'received', // или 'loading', зависит от реализации
    currentSwiper: [ {  externalId: { imdb: 'tywyy34', kpHD: 'sdf', tmdb: 1234 }}],
    theme: 'dark'
  });
});
it('should NOT dispatch when status is loading', async () => {
    mockUseSelector.mockImplementation((selector) => {
      const mockState = {
        theme: 'dark',
        swiper: {
          status: 'loading',
          error: null,
          collections: {} 
        }
      };
      return selector(mockState);
    });
  const { result } = await act(async () => {
    return renderHookWithRouter(() => useSwiperCollections(mockProps));
  });

    expect(mockDispatch).toHaveBeenCalledTimes(0); 
     expect(result.current).toEqual({
    error: null,
    status: 'loading', 
    currentSwiper: undefined,
    theme: 'dark'
  });
});

it('should handle error state', async () => {
  mockUseSelector.mockImplementation((selector) => {
    const mockState = {
      theme: 'dark',
      swiper: {
        status: 'rejected',
        error: 'The collection did not load',
        collections: {}
      }
    };
    return selector(mockState);
  });

  const { result } = renderHookWithRouter(() => useSwiperCollections(mockProps));
  
  expect(result.current).toEqual({
    error: 'The collection did not load',
    status: 'rejected',
    currentSwiper: undefined,
    theme: 'dark'
  });
});
});