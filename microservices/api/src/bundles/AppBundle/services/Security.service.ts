import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ActivityLogsSecurityService } from "./ActivityLogsSecurity.service";
import { DateSecurityService } from "./DateSecurity.service";
import { FieldSecurityService } from "./FieldSecurity.service";
import { NoteModelsSecurityService } from "./NoteModelsSecurity.service";

@Service()
export class SecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  public activityLogs: ActivityLogsSecurityService;

  @Inject()
  public noteModels: NoteModelsSecurityService;

  @Inject()
  public date: DateSecurityService;

  @Inject()
  public field: FieldSecurityService;
}
