import { Kernel } from "@bluelibs/core";
import { XUINextBundle } from "@bluelibs/x-ui-next";
import { Loading } from "@bluelibs/x-ui-react-bundle/dist/react/components";
import { UIAppBundle } from "../bundles/UIAppBundle/UIAppBundle";
import env from "../env";

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
      },
    }),
    new UIAppBundle(),
  ],
});

export const container = kernel.container;
