import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; //

import { useTheme } from '../use-theme';
import { Theme } from '../Theme';

jest.mock('../use-theme');
const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe('Theme', () => {
  
      beforeEach(() => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: jest.fn()
    });
  });

  it('should render as a button', () => {
    render(<Theme />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });
    it('should have proper accessibility attributes theme=`dark`', () => {
    render(<Theme />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true'); 
    expect(button).toHaveTextContent('Light Mode');
  });
      it('should have proper accessibility attributes theme=`light`', () => {
        mockUseTheme.mockReturnValueOnce({
      theme: 'light',
      toggleTheme: jest.fn()
    });
    render(<Theme />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false'); 
    expect(button).toHaveTextContent('Dark Mode');
  });

  it('should call toggleTheme when clicked', () => {
    const toggleMock = jest.fn();

    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: toggleMock
    });

    render(<Theme />);

    fireEvent.click(screen.getByRole('button'));
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
  
});
