import { Kernel } from '@bluelibs/core';
import { XUINextBundle } from '@bluelibs/x-ui-next';
import { Loading } from '@bluelibs/x-ui-react-bundle/dist/react/components';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { AppGuardian } from 'src/bundles/UIAppBundle/services';
import { UIAppBundle } from '../bundles/UIAppBundle/UIAppBundle';
import env from '../env';

export const theme = createTheme();

export const kernel = new Kernel({
  bundles: [
    new XUINextBundle({
      apollo: {
        client: {
          uri: env.API_URL,
        },
      },

      guardian: {
        loadingComponent: Loading as any, // FIXME
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
