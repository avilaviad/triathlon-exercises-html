import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App shell', () => {
  it('opens each empty-state screen from the bottom navigation', () => {
    render(<App />);

    const screens = [
      ['Library', 'Exercise library will appear here.'],
      ['Today', "Today's routine will appear here."],
      ['Planner', 'Weekly planning will appear here.'],
      ['Favorites', 'Saved favorite exercises will appear here.'],
      ['Progress', 'Completion history will appear here.'],
      ['Settings', 'App preferences will appear here.']
    ] as const;

    for (const [screenName, emptyText] of screens) {
      fireEvent.click(screen.getByRole('button', { name: screenName }));

      expect(screen.getByRole('heading', { name: screenName })).toBeInTheDocument();
      expect(screen.getByText(emptyText)).toBeInTheDocument();
    }
  });
});
