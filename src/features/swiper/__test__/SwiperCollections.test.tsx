import { fireEvent, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { SwiperCollections } from '../SwiperCollections';
import { useSwiperCollections } from '../use-swiperCollections';
import { renderWithRouter } from 'src/test-utils/testing';

jest.mock('../use-swiperCollections', () => ({
  __esModule: true,
  useSwiperCollections: jest.fn(() => ({
    error: null,
    status: 'received',
    currentSwiper: [{ externalId: { imdb: 'tt123', kpHD:'jj', tmdb: 123 } }],
    theme: 'dark'
  }))
}));

const mockUseSwiperCollections = useSwiperCollections as jest.MockedFunction<typeof useSwiperCollections>;


jest.mock('../../card/Card.tsx', () => ({
  __esModule: true,
  Card: ({ movId, onClick }: { movId: string; onClick: () => void }) => (
        <div  data-testid="mock-card" onClick={onClick}  >  Mock Card {movId} </div> )
}));

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper-mock">{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper-slide-mock" >{children}</div>
  ),
}));

jest.mock('swiper/modules', () => ({
  Navigation: jest.fn(),
  Autoplay: jest.fn(),
  Virtual: jest.fn(),
  Mousewheel: jest.fn(),
  FreeMode: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Оставляем остальные методы
  useNavigate: () => mockNavigate,
}));

const mockCollection = {
  name: 'test-collection',
  collection: Array(10).fill(null).map((_, index) => ({
    externalId: { imdb: `tt000000${index}`, kpHD:`${index}00`, tmdb: index }, // Генерируем 10 разных ID
  })),
};

describe('SwiperCollections', () => {

  beforeEach(() => {
     mockNavigate.mockClear();
  });
    afterAll(() => {
     jest.clearAllMocks;
  });

    it('should render error message when error exists', async() => {
          mockUseSwiperCollections.mockReturnValueOnce({
      error: 'The collection did not load',
      status: 'rejected',
      currentSwiper: [],
      theme: 'dark'
    });

    renderWithRouter(<SwiperCollections swiperKey='best-movies'  collection= {{
    name: 'Best movies',
    type: 'movie',
    rating: '8-10',
    genre: 'drama'
}} />);

    expect(await screen.findByRole('heading', { name: /can`t fetch data/i})).toBeInTheDocument();
    });

      it('should render Preloader when loading', async () => {

          mockUseSwiperCollections.mockReturnValueOnce({
      error: null,
      status: 'loading',
      currentSwiper: [],
      theme: 'dark'
    });

   renderWithRouter(<SwiperCollections swiperKey='best-movies'  collection= {{
    name: 'Best movies',
    type: 'movie',
    rating: '8-10',
    genre: 'drama'
}} />);

    expect(await screen.findByTestId('preloader')).toBeInTheDocument();
  });

   it('should render nothing when no data', async() => {
    mockUseSwiperCollections.mockReturnValueOnce({
      error: null,
      status: 'idle',
      currentSwiper: [],
      theme: 'dark'
    });

     renderWithRouter(<SwiperCollections swiperKey='best-movies'  collection= {{
    name: 'Best movies',
    type: 'movie',
    rating: '8-10',
    genre: 'drama'
}} />);

      expect(screen.findByTestId('customSwiper')).not.toBeInTheDocument;
  });
     it('should render customSwiper when received', async() => {
    mockUseSwiperCollections.mockReturnValueOnce({
      error: null,
      status: 'received',
      currentSwiper: [{ externalId: { imdb: 'tt123', kpHD:'jj', tmdb: 123 } }],
      theme: 'dark'
    });

     renderWithRouter(<SwiperCollections swiperKey='best-movies'  collection= {{
    name: 'Best movies',
    type: 'movie',
    rating: '8-10',
    genre: 'drama'
}} />);

      expect(screen.findByTestId('customSwiper')).toBeInTheDocument;
  });

  it('should navigate to details when card is clicked', async () => {    
     mockUseSwiperCollections.mockReturnValueOnce({
    error: null,
    status: 'received',
    currentSwiper: [{ externalId: { imdb: 'tt123', kpHD:'jj', tmdb: 123 } }],
    theme: 'light'
  });

     renderWithRouter(<SwiperCollections swiperKey='best-movies'  collection= {{
    name: 'Best movies',
    type: 'movie',
    rating: '8-10',
    genre: 'drama'
}} />);

  const cards = await screen.findAllByTestId('mock-card');
  fireEvent.click(cards[0]);

  expect(mockNavigate).toHaveBeenCalledWith('/details/tt123');
   expect(screen.getByRole('img', { name: /left-light/i})).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /right-light/i})).toBeInTheDocument();
  });

  it('should navigate to collection when "Show more" is clicked', async () => {
       mockUseSwiperCollections.mockReturnValueOnce({
      error: null,
      status: 'received',
      currentSwiper: [{ externalId: { imdb: 'tt123', tmdb: 123, kpHD: '123' } }],
      theme: 'dark'
    });

     renderWithRouter(<SwiperCollections swiperKey='best-movies'  collection= {{
    name: 'Best movies',
    type: 'movie',
    rating: '8-10',
    genre: 'drama'
}} />);

      const showMore = await screen.findByText('Show more');
      await userEvent.click(showMore);

      expect(mockNavigate).toHaveBeenCalledWith('/collection/Best movies/best-movies');
      expect(screen.getByRole('img', { name: /left/i})).toBeInTheDocument();
       expect(screen.getByRole('img', { name: /right/i})).toBeInTheDocument();

  });
});

