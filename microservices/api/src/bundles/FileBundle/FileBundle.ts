import { BaseBundle } from "@bluelibs/x-bundle";
import * as listeners from "./listeners";
import * as collections from "./collections";
import * as validators from "./validators";
import * as fixtures from "./fixtures";

export class FileBundle extends BaseBundle<any> {
  async prepare() {
    this.setupBundle({
      listeners,
      collections,
      validators,
      fixtures,
    });
  }
}
