import { RootState } from '../../../store';
import { selectNavigateInfo, selectNavigateList } from '../navigate-selector';



  const mockState: Partial<RootState> = {
    navigate: {
      list: [
        { externalId: { imdb: 'tywyy34', tmdb: 1234, kpHD: 'sdf' } },
        { externalId: { imdb: 'tyy34', tmdb: 124, kpHD: 'sdjf' } }
      ],
      status: 'idle',
      error: null
    }
  };
  const mockState2: Partial<RootState> = {
    navigate: {
      list: [ ],
      status: 'idle',
      error: null
    }
  };
describe('navigateSelectors', () => {
    
        describe('selectNavigateInfo', () => {
    it('should return entire navigate state', () => {
      const result = selectNavigateInfo(mockState as RootState);
      
      expect(result).toEqual({
      list: [
        { externalId: { imdb: 'tywyy34', tmdb: 1234, kpHD: 'sdf' } },
        { externalId: { imdb: 'tyy34', tmdb: 124, kpHD: 'sdjf' } }
      ],
        status: 'idle',
        error: null
      });
    });

    it('should work with empty state', () => {
      const emptyState = { navigate: {} } as RootState;
      const result = selectNavigateInfo(emptyState);
      
      expect(result).toEqual({});
    });
  });

  describe('selectNavigateList', () => {
    it('should return navigate list', () => {
      const result = selectNavigateList(mockState as RootState);
      
      expect(result).toEqual([
       { externalId: { imdb: 'tywyy34', tmdb: 1234, kpHD: 'sdf' } },
        { externalId: { imdb: 'tyy34', tmdb: 124, kpHD: 'sdjf' } }
      ]);
    });

    it('should return empty array when no list', () => {
      const stateWithoutList =  mockState2  as RootState;
      
      const result = selectNavigateList(stateWithoutList);
      expect(result).toEqual([]);

    }); 
  });
});
