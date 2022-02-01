import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ActivitiesCollection } from "../collections";

@Service()
export class ActivityService {
  constructor() {}

  @Inject()
  private activitiesCollection: ActivitiesCollection;

  public async getAll() {
    return this.activitiesCollection.query({
      _id: 1,

      name: 1,
    });
  }
}
