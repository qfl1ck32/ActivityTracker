import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";

import * as DayJS from "dayjs";

// TODO: setup locale & stuff

@Service()
export class DateService {
  constructor() {}

  get toDayJS() {
    return DayJS;
  }
}
