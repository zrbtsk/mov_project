import { RootState } from '../../../store';
import { selectSwiperList, selectSwiperInfo } from '../swiper-select';



describe('swiperSelect', () => {
    
    const mockState: Partial<RootState> = {
    swiper: {
      status: 'received',
      error: null,
      collections: {
        popular: [{ externalId: { imdb: 'tywyy34', tmdb: 1234, kpHD: 'sdf' }}],
        trending: [{ externalId: { imdb: 'ty34', tmdb: 134, kpHD: 'smf' }}],
      },
    },
  };

  describe('selectSwiperList', () => {
    it('should select collection by key', () => {

      const result = selectSwiperList(mockState as RootState, 'popular');
      expect(result).toEqual([{ externalId: { imdb: 'tywyy34', tmdb: 1234, kpHD: 'sdf' }}]);
    });

    it('should return undefined for non-existent key', () => {
      const result = selectSwiperList(mockState as RootState, 'unknown');

      expect(result).toBeUndefined();
    });
  });

   describe('selectSwiperInfo', () => {
    it('should select swiper status and error', () => {
      const result = selectSwiperInfo(mockState as RootState);

      expect(result).toEqual({
        status: 'received',
        error: null,
      });
    });

    it('should handle error state', () => {
      const errorState: Partial<RootState> = {
        swiper: {
          ...mockState.swiper!,
          status: 'rejected',
          error: 'The collection did not load',
        },
      };

      const result = selectSwiperInfo(errorState as RootState);

      expect(result).toEqual({
        status: 'rejected',
        error: 'The collection did not load',
      });
    });
  });

});
