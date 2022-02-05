import { useQuery } from '@apollo/client';
import { EventHandlerType } from '@bluelibs/core';
import { useEventManager, useUIComponents } from '@bluelibs/x-ui-next';
import { Box, Button } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Field, NoteModel, Query } from 'src/api.types';
import {
  INoteModelCreated,
  INoteModelUpdated,
  NoteModelCreatedEvent,
  NoteModelUpdatedEvent,
} from 'src/bundles/UIAppBundle/events';
import { NoteModelsGetAll } from 'src/bundles/UIAppBundle/queries';
import { NoteModelsEditDialog } from '../..';
import { DataGridContainer } from '../DataGrid';

const columns: GridColumns = [
  {
    field: 'id',
    headerName: 'ID',

    width: 300,
  },

  {
    field: 'name',
    headerName: 'Name',

    width: 250,
  },

  {
    field: 'fields',
    headerName: 'Fields',

    width: 250,

    renderCell: (params) => {
      const fields = params.value as Field[];

      const [open, setOpen] = useState(false);

      const noteModel = params.row as NoteModel;

      return (
        <Box>
          <Button onClick={() => setOpen(true)}>See</Button>
          <NoteModelsEditDialog
            {...{
              open,
              onClose: () => setOpen(false),

              initialFields: fields,

              defaultValues: noteModel,
            }}
          />
        </Box>
      );
    },
  },

  {
    field: 'createdAt',
    headerName: 'Created At',

    width: 300,

    valueFormatter: (params) => new Date(params.value as number).toLocaleDateString(),
  },
];

export const NoteModelsListContainer: React.FC = () => {
  const [noteModels, setNoteModels] = useState<NoteModel[]>([]);

  const { loading, error } = useQuery<{ EndUsersNoteModelsGetAll: Query['EndUsersNoteModelsGetAll'] }>(
    NoteModelsGetAll,
    {
      onCompleted: (data) => setNoteModels(data.EndUsersNoteModelsGetAll),
    }
  );

  const eventManager = useEventManager();

  useEffect(() => {
    const listener: EventHandlerType<INoteModelCreated> = (e) => {
      setNoteModels((previous) => previous.concat(e.data.noteModel));
    };

    eventManager.addListener(NoteModelCreatedEvent, listener);

    return () => {
      eventManager.removeListener(NoteModelCreatedEvent as any, listener); // TODO as any ? fix from bluelibs
    };
  }, []);

  useEffect(() => {
    const listener: EventHandlerType<INoteModelUpdated> = (e) => {
      setNoteModels((previous) => {
        const noteModels = [...previous];

        const { noteModel } = e.data;

        const oldNoteModelIndex = noteModels.findIndex((model) => model._id === noteModel._id);

        noteModels.splice(oldNoteModelIndex, 1, noteModel);

        return noteModels;
      });
    };

    eventManager.addListener(NoteModelUpdatedEvent, listener);

    return () => {
      eventManager.removeListener(NoteModelUpdatedEvent as any, listener); // TODO as any ? fix from bluelibs
    };
  }, []);

  const UIComponents = useUIComponents();

  if (loading) return <UIComponents.Loading />;

  if (error) return <UIComponents.Error error={error} />;

  const onDelete = async (id: string) => {
    console.log(id);
  };

  return <DataGridContainer {...{ rows: noteModels, columns, onDelete }} />;
};
