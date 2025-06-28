import { RootState } from '../../../store';
import { selectTheme } from '../theme-selector';

describe('themeSelector', () => {
    it('should return the current theme from the state', () => {

    const mockState: RootState = {
      theme: 'dark', 
    } as RootState; 

    expect(selectTheme(mockState)).toBe('dark');
  });

  it('should return "light" if theme is light', () => {
    const mockState: RootState = {
      theme: 'light',
    } as RootState;

    expect(selectTheme(mockState)).toBe('light');
  });
  
});
