import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";

import { DatesAreNotInChronologicalOrderException } from "../exceptions/DatesAreNotInChronologicalOrder.exception";
import { DateService } from "./Date.service";

@Service()
export class DateSecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private dateService: DateService;

  public checkDatesAreInChronologicalOrder(date1: Date, date2: Date) {
    if (
      this.dateService
        .toDayJS(date1)
        .isAfter(this.dateService.toDayJS(date2), "seconds")
    ) {
      throw new DatesAreNotInChronologicalOrderException();
    }
  }
}
