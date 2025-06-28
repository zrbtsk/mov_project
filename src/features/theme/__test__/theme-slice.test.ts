import { themeReducer, setTheme } from '../theme-slice';

describe('themeSlice', () => {
  it('should return default state when passed an empty action', () => {
    const result = themeReducer(undefined, { type: 'unknown' });

    expect(result).toBe('dark');
  });

  it('should changing the theme when the "setTheme" action is triggered', () => {
    const action1 = {type: setTheme.type, payload: 'light'};
    const action2 = {type: setTheme.type, payload: 'dark'};

     expect(themeReducer('dark', action1)).toBe('light');
     expect(themeReducer('light', action2)).toBe('dark');

  });
  
      it('should ignore unknown actions', () => {
      expect(themeReducer('dark', { type: 'unknown/action' })).toBe('dark');
    });
  });
  
  describe('action creators', () => {
    it('setTheme should create correct action', () => {
      expect(setTheme('light')).toEqual({
        type: '@@theme/setTheme',
        payload: 'light',
      });
    });
});
