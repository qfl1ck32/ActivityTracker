// TODO: is this the best way?
if (process.env.NODE_ENV === "production") {
  require("module-alias/register");
}

import "./env";
import { kernel } from "./kernel";
import "./bundles";

kernel.init().catch((e) => {
  console.error(e);
  process.exit(0);
});
