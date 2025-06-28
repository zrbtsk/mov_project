import MockAdapter from 'axios-mock-adapter';

import { MovieId } from '../../../types';
import { loadSwiper, swiperReducer, SwiperSlice } from '../swiper-slice';
import { searchAll } from '../../../config';

const mockArgs = {
  type: 'movie',
  rating: '7-10',
  genre: 'comedy',
  swiperKey: 'ddf',
};
const mockArgsNoGenre = {
  type: 'movie',
  rating: '7-10',
  genre: '',
  swiperKey: 'ddf',
};

const mockAxios = new MockAdapter(searchAll);

const mockInitialState: SwiperSlice = {
  status: 'idle',
  error: null,
  collections: {},
};
const mockSwiper: MovieId[] = [
  { externalId: { imdb: 'tywyy34', tmdb: 1234, kpHD: 'sdf' } },
];

describe('swiper-slice', () => {
  describe('swiperThunk', () => {
    beforeEach(() => {
      mockAxios.reset();
    });
    afterAll(()=> {
mockAxios.reset();
    });
it('should fetchSwiper with resolved response without a genre', async () => {
      const dispatch = jest.fn();
      const thunk = loadSwiper(mockArgsNoGenre);

      mockAxios
        .onGet('/v1.4/movie', {
          params: {
            page: 1,
            limit: 10,
            notNullFields: 'externalId.imdb',
            selectFields: 'externalId',
            type: 'movie',
            'rating.imdb': '7-10',
          },
        })
        .reply(200, { docs: mockSwiper });

      await thunk( dispatch, () => ({ data: mockSwiper, key: mockArgsNoGenre.swiperKey }),  mockArgsNoGenre );

      const { calls } = dispatch.mock;
      const [start, end] = calls;

      expect(calls).toHaveLength(2);
      expect(start[0].type).toBe('@@swiper/load-swiper/pending');
      expect(end[0].type).toBe('@@swiper/load-swiper/fulfilled');
      expect(end[0].payload).toEqual({
        data: mockSwiper,
        key: mockArgsNoGenre.swiperKey,
      });
    });

    it('should fetchSwiper with resolved response', async () => {
      const dispatch = jest.fn();
      const thunk = loadSwiper(mockArgs);

      mockAxios
        .onGet('/v1.4/movie', {
          params: {
            page: 1,
            limit: 10,
            notNullFields: 'externalId.imdb',
            selectFields: 'externalId',
            type: 'movie',
            'rating.imdb': '7-10',
            'genres.name': 'comedy',
          },
        })
        .reply(200, { docs: mockSwiper });

      await thunk( dispatch, () => ({ data: mockSwiper, key: mockArgs.swiperKey }),  mockArgs   );

      const { calls } = dispatch.mock;
      const [start, end] = calls;

      expect(calls).toHaveLength(2);
      expect(start[0].type).toBe('@@swiper/load-swiper/pending');
      expect(end[0].type).toBe('@@swiper/load-swiper/fulfilled');
      expect(end[0].payload).toEqual({
        data: mockSwiper,
        key: mockArgs.swiperKey,
      });
    });

    it('should fetchSwiper with rejected response', async () => {
      const errorMessage = 'API Error Message';

      const dispatch = jest.fn();
      const thunk = loadSwiper(mockArgs);

      mockAxios
        .onGet('/v1.4/movie', {
          params: {
            page: 1,
            limit: 10,
            notNullFields: 'externalId.imdb',
            selectFields: 'externalId',
            type: 'movie',
            'rating.imdb': '7-10',
            'genres.name': 'comedy',
          },
        })
        .reply(500, { message: errorMessage });

      await thunk(dispatch, () => ({ message: errorMessage }), mockArgs);

      const { calls } = dispatch.mock;
      const [start, end] = calls;

      expect(calls).toHaveLength(2);
      expect(start[0].type).toBe('@@swiper/load-swiper/pending');
      expect(end[0].type).toBe('@@swiper/load-swiper/rejected');
      expect(end[0].payload).toBe(errorMessage);
    });
  });

  describe('swiperSlice', () => {
    it('should return default state when passed an empty action', () => {
      const result = swiperReducer(undefined, { type: 'unknown' });

      expect(result).toEqual(mockInitialState);
    });

    it('should change status with`loadSwiper.pending` action', () => {
      const state = swiperReducer(
        mockInitialState,
        loadSwiper.pending('requestId', mockArgs)
      );

      expect(state.status).toBe('loading');
      expect(state.error).toBeNull();
    });
    it('should change status with`loadSwiper.rejected` action', () => {
      const state = swiperReducer(
        mockInitialState,
        loadSwiper.rejected(null, 'requestId', mockArgs)
      );

      expect(state.status).toBe('rejected');
      expect(state.error).toBe('The collection did not load');
    });
    it('should change status with`loadSwiper.fulfilled` action', () => {
      const state = swiperReducer(
        mockInitialState,
        loadSwiper.fulfilled(
          { data: mockSwiper, key: mockArgs.swiperKey },
          'requestId',
          mockArgs
        )
      );

      expect(state).toEqual({
        status: 'received',
        error: null,
        collections: {
          [mockArgs.swiperKey]: mockSwiper,
        },
      });
    });
  });
});
