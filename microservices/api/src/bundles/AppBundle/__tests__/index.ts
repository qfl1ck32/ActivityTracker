import "./ActivityLogDetails.service.test.ts";
import "./NoteModels.service.test.ts";
import "./NoteModelsSecurity.service.test.ts";
import "./EndUser.service.test.ts";
import "./ActivityLogsSecurity.service.test.ts";
import "./Security.service.test.ts";
import "./ActivityLogs.service.test.ts";
import { container } from "../../../__tests__/ecosystem";
import { AppFixture } from "../fixtures";

beforeAll(async () => {
  return container.get(AppFixture).clean();
});

afterEach(async () => {
  return container.get(AppFixture).clean();
});
