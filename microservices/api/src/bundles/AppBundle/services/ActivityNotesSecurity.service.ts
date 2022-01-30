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
    const { value, activityLogDetailsId } = input;

    const {
      activityLog: {
        noteModel: { fields: noteModelFields },
      },
    } = await this.activityLogDetailsCollection.queryOne({
      $: {
        filters: {
          _id: activityLogDetailsId,
        },
      },

      activityLog: {
        noteModel: {
          fields: 1,
        },
      },
    });

    const fields = EJSON.parse(value) as Record<string, any>;

    this.checkFieldsAreValid(
      noteModelFields.map((field) => field.name),
      Object.keys(fields)
    );

    for (const field of noteModelFields) {
      this.fieldSecurityService.checkFieldValueIsValid(
        field,
        fields[field.name]
      );
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
