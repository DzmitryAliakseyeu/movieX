import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

interface Catalog {
  title: string;
  content: [];
}

interface State {
  theme: 'light' | 'dark';
  catalogs: Catalog[];
}

export const Store = signalStore(
  { providedIn: 'root' },

  withState<State>({
    theme: 'light',
    catalogs: [
      {
        title: 'Movies',
        content: [],
      },
      {
        title: 'TV Shows',
        content: [],
      },
      {
        title: 'People',
        content: [],
      },
    ],
  }),

  withMethods((store) => ({
    setTheme(theme: 'light' | 'dark') {
      patchState(store, {
        theme: theme,
      }),
      document.body.style.colorScheme = theme;
    },
    toggleTheme() {
      const next = store.theme() === 'light' || '' ? 'dark' : 'light';

      patchState(store, {
        theme: next,
      });

      document.body.style.colorScheme = next;
    },
  })),
);
