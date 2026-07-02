import { useMemo, useState } from 'react';

type ScreenId = 'library' | 'today' | 'planner' | 'favorites' | 'progress' | 'settings';

type Screen = {
  id: ScreenId;
  label: string;
  emptyText: string;
};

const screens: Screen[] = [
  {
    id: 'library',
    label: 'Library',
    emptyText: 'Exercise library will appear here.'
  },
  {
    id: 'today',
    label: 'Today',
    emptyText: "Today's routine will appear here."
  },
  {
    id: 'planner',
    label: 'Planner',
    emptyText: 'Weekly planning will appear here.'
  },
  {
    id: 'favorites',
    label: 'Favorites',
    emptyText: 'Saved favorite exercises will appear here.'
  },
  {
    id: 'progress',
    label: 'Progress',
    emptyText: 'Completion history will appear here.'
  },
  {
    id: 'settings',
    label: 'Settings',
    emptyText: 'App preferences will appear here.'
  }
];

function App() {
  const [activeScreenId, setActiveScreenId] = useState<ScreenId>('library');
  const activeScreen = useMemo(
    () => screens.find((screen) => screen.id === activeScreenId) ?? screens[0],
    [activeScreenId]
  );

  return (
    <main className="app-shell" aria-label="Triathlon app">
      <section className="phone-frame">
        <header className="app-header">
          <p className="eyebrow">Triathlon</p>
          <h1>Exercise Library</h1>
        </header>

        <section className="screen-panel" aria-labelledby="active-screen-title">
          <div className="screen-accent" aria-hidden="true" />
          <h2 id="active-screen-title">{activeScreen.label}</h2>
          <p>{activeScreen.emptyText}</p>
        </section>

        <nav className="bottom-nav" aria-label="Primary navigation">
          {screens.map((screen) => (
            <button
              key={screen.id}
              type="button"
              className={screen.id === activeScreenId ? 'nav-button active' : 'nav-button'}
              aria-current={screen.id === activeScreenId ? 'page' : undefined}
              onClick={() => setActiveScreenId(screen.id)}
            >
              <span className="nav-dot" aria-hidden="true" />
              <span>{screen.label}</span>
            </button>
          ))}
        </nav>
      </section>
    </main>
  );
}

export default App;
