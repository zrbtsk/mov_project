import { render, renderHook, RenderHookResult, RenderResult } from '@testing-library/react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

export const renderWithRouter = (
  component: ReactElement,
  options: MemoryRouterProps = {}
): RenderResult => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}> <MemoryRouter {...options}>{children}</MemoryRouter></Provider>
  );
  
  return render(component, { wrapper: Wrapper });
};


export const renderHookWithRouter = <TResult, TProps>(
  hook: (props: TProps) => TResult,
  options: MemoryRouterProps = {}
): RenderHookResult<TResult, TProps> => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}> <MemoryRouter {...options}>{children}</MemoryRouter></Provider>
  );

  return renderHook<TResult, TProps>(hook, { wrapper: Wrapper });
};
