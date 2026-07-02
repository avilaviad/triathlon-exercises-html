import { render, screen } from '@testing-library/react';
import App from './App';

describe('App shell', () => {
  it('renders named empty screens and bottom navigation', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Library' })).toBeInTheDocument();
    expect(screen.getByText('Exercise library will appear here.')).toBeInTheDocument();

    for (const screenName of ['Library', 'Today', 'Planner', 'Favorites', 'Progress', 'Settings']) {
      expect(screen.getByRole('button', { name: screenName })).toBeInTheDocument();
    }
  });
});
