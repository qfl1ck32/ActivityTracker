import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ActivityLogsSecurityService } from "./ActivityLogsSecurity.service";
import { NoteModelsSecurityService } from "./NoteModelsSecurity.service";

@Service()
export class SecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  public activityLogs: ActivityLogsSecurityService;

  @Inject()
  public noteModels: NoteModelsSecurityService;
}
