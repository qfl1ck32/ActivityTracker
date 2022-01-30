import { DateSecurityService } from "../services/DateSecurity.service";
import { container } from "../../../__tests__/ecosystem";
import { DatesAreNotInChronologicalOrderException } from "../exceptions";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("DateSecurityService", () => {
  test("checkDatesAreInChronologicalOrder()", async () => {
    const dateSecurityService = container.get(DateSecurityService);

    const now = new Date("03-01-2000 08:00:30");
    const beforeNow = new Date(now);
    const afterNow = new Date(now);

    beforeNow.setSeconds(now.getSeconds() - 5);
    afterNow.setSeconds(now.getSeconds() + 5);

    const check = (date1: Date, date2: Date) => () =>
      dateSecurityService.checkDatesAreInChronologicalOrder(date1, date2);

    expect(check(beforeNow, now)).not.toThrow();
    expect(check(beforeNow, afterNow)).not.toThrow();
    expect(check(now, afterNow)).not.toThrow();

    expect(check(now, beforeNow)).toThrowError(
      new DatesAreNotInChronologicalOrderException()
    );

    expect(check(afterNow, beforeNow)).toThrowError(
      new DatesAreNotInChronologicalOrderException()
    );

    expect(check(afterNow, now)).toThrowError(
      new DatesAreNotInChronologicalOrderException()
    );
  });
});
