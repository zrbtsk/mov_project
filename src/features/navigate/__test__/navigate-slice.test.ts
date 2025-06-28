import {
  loadNavigate,
  navigateReducer,
  NavigateSlice,
} from '../navigate-slice';
import { Genre, MovieId } from '../../../types';
import MockAdapter from 'axios-mock-adapter';
import { searchAll } from '../../../config';

const mocksArgs = {
  type: 'movie',
  genre: ['драма'] as Genre[],
  country: 'США',
  year: '2000-2008',
  rating: '4-10',
  page: 1,
};

const mockAxios = new MockAdapter(searchAll);

const mockInitialState: NavigateSlice = {
  error: null,
  status: 'idle',
  list: [],
};

const mockData: MovieId[] = [
  { externalId: { imdb: 'tywyy34', tmdb: 1234, kpHD: 'sdf' } },
  { externalId: { imdb: 'tywdfghyy34', tmdb: 12364, kpHD: 'sdоf' } },
];

const mockParams = {
  limit: 10,
  notNullFields: 'externalId.imdb',
  selectFields: 'externalId',
  page: String(mocksArgs.page),
  type: mocksArgs.type,
  'genres.name': 'драма' as Genre,
  'countries.name': mocksArgs.country,
  year: mocksArgs.year,
  'rating.imdb': mocksArgs.rating,
};

describe('navigate-slice', () => {
  describe('navigateThunk', () => {
    beforeEach(() => {
      mockAxios.reset();
    });

    it('should fetchSwiper with resolved response ', async () => {
      const dispatch = jest.fn();
      const getState = jest
        .fn()
        .mockReturnValue({ navigate: mockInitialState });
      const thunk = loadNavigate(mocksArgs);

      // 1. Создаем ожидаемые параметры как объект
      const expectedParams = {
        limit: '10',
        notNullFields: 'externalId.imdb',
        selectFields: ['externalId', 'poster'],
        page: String(mocksArgs.page),
        type: mocksArgs.type,
        'genres.name': mocksArgs.genre,
        'countries.name': mocksArgs.country,
        year: mocksArgs.year,
        'rating.imdb': mocksArgs.rating,
      };

      mockAxios.onGet('/v1.4/movie').reply((config) => {
        const actualParams = Object.fromEntries(
          new URLSearchParams(config.params)
        );

        expect(actualParams.limit).toBe(expectedParams.limit);
        expect(actualParams.notNullFields).toBe(expectedParams.notNullFields);

        return [200, { docs: mockData }];
      });

      await thunk(dispatch, getState, undefined);

      const { calls } = dispatch.mock;
      const [start, end] = calls;

      expect(start[0].type).toBe('@@navigate/load-navigate/pending');
      expect(end[0].type).toBe('@@navigate/load-navigate/fulfilled');
      expect(end[0].payload).toEqual({
        data: mockData,
        page: mocksArgs.page,
      });
    });
    it('should fetchSwiper with resolved response without a genre, country, year, rating, type ', async () => {
      const dispatch = jest.fn();
      const getState = jest
        .fn()
        .mockReturnValue({ navigate: mockInitialState });
      const thunk = loadNavigate(mocksArgs);

      // 1. Создаем ожидаемые параметры как объект
      const expectedParams = {
        limit: '10',
        notNullFields: 'externalId.imdb',
        selectFields: ['externalId', 'poster'],
        page: String(mocksArgs.page),
      };

      mockAxios.onGet('/v1.4/movie').reply((config) => {
        const actualParams = Object.fromEntries(
          new URLSearchParams(config.params)
        );

        expect(actualParams.limit).toBe(expectedParams.limit);
        expect(actualParams.notNullFields).toBe(expectedParams.notNullFields);

        return [200, { docs: mockData }];
      });

      await thunk(dispatch, getState, undefined);

      const { calls } = dispatch.mock;
      const [start, end] = calls;

      expect(start[0].type).toBe('@@navigate/load-navigate/pending');
      expect(end[0].type).toBe('@@navigate/load-navigate/fulfilled');
      expect(end[0].payload).toEqual({
        data: mockData,
        page: mocksArgs.page,
      });
    });

    it('should fetchSwiper with rejected response', async () => {
      const dispatch = jest.fn();
      const getState = jest
        .fn()
        .mockReturnValue({ navigate: mockInitialState });
      const thunk = loadNavigate(mocksArgs);
      const errorMessage = 'API Error Message';

      // 1. Создаем ожидаемые параметры как объект
      const expectedParams = {
        limit: '10',
        notNullFields: 'externalId.imdb',
        selectFields: ['externalId', 'poster'],
        page: String(mocksArgs.page),
      };

      mockAxios.onGet('/v1.4/movie').reply((config) => {
        const actualParams = Object.fromEntries(
          new URLSearchParams(config.params)
        );

        expect(actualParams.limit).toBe(expectedParams.limit);
        expect(actualParams.notNullFields).toBe(expectedParams.notNullFields);

        return [500, { message: errorMessage }];
      });

      await thunk(dispatch, getState, undefined);

      const { calls } = dispatch.mock;
      const [start, end] = calls;

      expect(start[0].type).toBe('@@navigate/load-navigate/pending');
      expect(end[0].type).toBe('@@navigate/load-navigate/rejected');
      expect(end[0].payload).toBe(errorMessage);
    });
  });
  describe('navigateSlice', () => {
    it('should return default state when passed an empty action', () => {
      const result = navigateReducer(undefined, { type: 'unknown' });

      expect(result).toEqual(mockInitialState);
    });
    it('should change status with`loadNavigate.pending` action', () => {
      const state = navigateReducer(
        mockInitialState,
        loadNavigate.pending('requestId', mocksArgs)
      );

      expect(state.status).toBe('loading');
      expect(state.error).toBeNull();
    });
    it('should change status with`loadNavigate.rejected` action', () => {
      const state = navigateReducer(
        mockInitialState,
        loadNavigate.rejected(null, 'requestId', mocksArgs)
      );

      expect(state.status).toBe('rejected');
      expect(state.error).toBe('The films didn`t sink in');
    });
    it('should change status with`loadNavigate.fulfilled` action', () => {
      const state = navigateReducer(
        mockInitialState,
        loadNavigate.fulfilled(
          { data: mockData, page: mocksArgs.page },
          'requestId',
          mocksArgs
        )
      );

      expect(state).toEqual({
        status: 'received',
        error: null,
        list: mockData,
      });
    });
    it('should change status with`loadNavigate.fulfilled` action page = 2', () => {
                          const mocksArgs2 = {
  type: 'movie',
  genre: ['драма'] as Genre[],
  country: 'США',
  year: '2000-2008',
  rating: '4-10',
  page: 2,
};
      const state = navigateReducer(
        mockInitialState,
        loadNavigate.fulfilled(
          { data: mockData, page: mocksArgs2.page },
          'requestId',
          mocksArgs2
        )
      );

      expect(state).toEqual({
        status: 'received',
        error: null,
        list: mockData,
      });
    });
  });
});
