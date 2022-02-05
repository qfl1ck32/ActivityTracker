import { useMutation } from "@apollo/client";
import { EJSON } from "@bluelibs/ejson";
import { useEventManager } from "@bluelibs/x-ui-react-bundle";
import { useState } from "react";
import { ActivityNote, Mutation, EndUsersActivityNotesUpdateInput } from "src/api.types";
import { useActivityLog } from "src/bundles/UIAppBundle/contexts";
import { ActivityNoteUpdatedEvent } from "src/bundles/UIAppBundle/events";
import { ActivityNotesUpdate } from "src/bundles/UIAppBundle/mutations";
import { ActivityNoteDetailNoteValuesType } from "src/bundles/UIAppBundle/types";
import { NoteDetailsForm } from "../..";

import { toast } from 'react-toastify'

export type ActivityNotesEditContainerProps = {
    activityNote: ActivityNote;

    activityLogDetailsId: string;
}

export const ActivityNotesEditContainer: React.FC<ActivityNotesEditContainerProps> = ({ activityNote, activityLogDetailsId }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [activityLog] = useActivityLog()

    const eventManager = useEventManager()


    const value = EJSON.parse(activityNote.value) as ActivityNoteDetailNoteValuesType;

    const [updateActivityNote] = useMutation<{ EndUsersActivityNotesUpdate: Mutation['EndUsersActivityNotesUpdate'] }, { input: EndUsersActivityNotesUpdateInput }>(ActivityNotesUpdate)

    const onSubmit = async (value: Record<string, any>) => {
        setIsSubmitting(true)

        try {
            const { data } = await updateActivityNote({
                variables: {
                    input: {
                        activityLogDetailsId,
                        value: EJSON.stringify(value)
                    }
                }
            })

            await eventManager.emit(new ActivityNoteUpdatedEvent({
                activityNote: data?.EndUsersActivityNotesUpdate as ActivityNote
            }))

            toast.info("You have successfully updated the note!")
        }

        catch (err: any) {
            toast.error(err.toString())
        }

        finally {
            setIsSubmitting(false)
        }
    }

    return <NoteDetailsForm
        isSubmitting={isSubmitting}
        type="edit"
        onSubmit={onSubmit}
        noteModel={
            activityLog.noteModel
        }
        defaultValues={value}
    />
}