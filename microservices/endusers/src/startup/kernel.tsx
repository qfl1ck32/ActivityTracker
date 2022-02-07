import { Kernel } from '@bluelibs/core';
import { XUINextBundle } from '@bluelibs/x-ui-next';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { Loader } from 'src/bundles/UIAppBundle/overrides';
import { AppGuardian } from 'src/bundles/UIAppBundle/services';
import { UIAppBundle } from '../bundles/UIAppBundle/UIAppBundle';
import env from '../env';

export const theme = createTheme({
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

export const kernel = new Kernel({
  bundles: [
    new XUINextBundle({
      apollo: {
        client: {
          uri: env.API_URL,
        },
      },

      guardian: {
        loadingComponent: (() => <Loader center />) as any,
        guardianClass: AppGuardian,
      },

      react: {
        wrappers: [
          {
            component: ThemeProvider,
            props: () => ({
              theme,
            }),

            order: -10,
          },
        ],
      },
    }),
    new UIAppBundle(),
  ],
});

export const container = kernel.container;
