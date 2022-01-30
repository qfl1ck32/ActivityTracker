import { Bundle } from '@bluelibs/core';
import { XUINextBundle } from '@bluelibs/x-ui-next';
import { AppGuardian } from './services/AppGuardian';

import * as ComponentOverrides from './overrides';

export class UIAppBundle extends Bundle {
  async prepare() {
    const xui = this.container.get(XUINextBundle);

    xui.setGuardianClass(AppGuardian);

    xui.updateComponents(ComponentOverrides);
  }
}
