import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { EJSON } from "@bluelibs/ejson";
import { ActivityLogDetailsCollection, Field } from "../collections";
import { FieldNameIsNotDefinedInNoteModelException } from "../exceptions/FieldNameIsNotDefinedInNoteModel.exception";
import { FieldSecurityService } from "./FieldSecurity.service";
import { EndUsersActivityNotesUpdateInput } from "./inputs";

@Service()
export class ActivityNotesSecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private activityLogDetailsCollection: ActivityLogDetailsCollection;

  @Inject()
  private fieldSecurityService: FieldSecurityService;

  public async checkUpdateInputIsValid(
    input: EndUsersActivityNotesUpdateInput
  ) {
    const { value, activityLogDetailId } = input;

    const {
      activityLog: {
        noteModel: { fields: noteModelFields },
      },
    } = await this.activityLogDetailsCollection.queryOne({
      $: {
        filters: {
          _id: activityLogDetailId,
        },
      },

      activityLog: {
        noteModel: {
          fields: {
            id: 1,

            name: 1,
            type: 1,

            enumValues: 1,
          },
        },
      },
    });

    this.checkNoteDetailsValueIsValid(value, noteModelFields);
  }

  public checkNoteDetailsValueIsValid(
    noteDetailsValue: string,
    noteModelFields: Field[]
  ) {
    const fields = EJSON.parse(noteDetailsValue) as Record<string, any>;

    this.checkFieldsAreValid(
      noteModelFields.map((field) => field.id),
      Object.keys(fields)
    );

    for (const field of noteModelFields) {
      this.fieldSecurityService.checkFieldValueIsValid(field, fields[field.id]);
    }
  }

  private checkFieldsAreValid(
    acceptedFieldNames: string[],
    fieldNames: string[]
  ) {
    const accepted = {};

    for (const fieldName of acceptedFieldNames) {
      accepted[fieldName] = true;
    }

    for (const fieldName of fieldNames) {
      if (!accepted[fieldName]) {
        throw new FieldNameIsNotDefinedInNoteModelException({ fieldName });
      }
    }
  }
}
