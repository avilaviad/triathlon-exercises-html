import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App shell', () => {
  it('keeps all primary navigation items accessible and updates the active page', () => {
    render(<App />);

    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });
    const navItems = [
      'Library',
      'Today',
      'Planner',
      'Favorites',
      'Progress',
      'Settings'
    ] as const;

    for (const item of navItems) {
      expect(screen.getByRole('button', { name: item })).toBeInTheDocument();
    }

    expect(navigation).toContainElement(screen.getByRole('button', { name: 'Settings' }));

    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));

    expect(screen.getByRole('button', { name: 'Settings' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

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
