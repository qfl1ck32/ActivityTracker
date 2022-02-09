import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { FileSecurityService } from "@bundles/FileBundle/services/FileSecurity.service";
import { ActivityLogDetailsSecurityService } from "./ActivityLogDetailsSecurity.service";
import { ActivityLogsSecurityService } from "./ActivityLogsSecurity.service";
import { ActivityNotesSecurityService } from "./ActivityNotesSecurity.service";
import { DateSecurityService } from "./DateSecurity.service";
import { FieldSecurityService } from "./FieldSecurity.service";
import { NoteModelsSecurityService } from "./NoteModelsSecurity.service";
import { UsersSecurityService } from "./UsersSecurity.service";

@Service()
export class SecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  public activityLogs: ActivityLogsSecurityService;

  @Inject()
  public activityLogDetails: ActivityLogDetailsSecurityService;

  @Inject()
  public noteModels: NoteModelsSecurityService;

  @Inject()
  public dates: DateSecurityService;

  @Inject()
  public field: FieldSecurityService;

  @Inject()
  public activityNotes: ActivityNotesSecurityService;

  @Inject()
  public files: FileSecurityService;

  @Inject()
  public users: UsersSecurityService;
}
