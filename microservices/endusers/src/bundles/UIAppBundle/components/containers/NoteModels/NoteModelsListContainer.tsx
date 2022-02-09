import { useQuery } from '@apollo/client';
import { EventHandlerType } from '@bluelibs/core';
import { useEventManager, useUIComponents } from '@bluelibs/x-ui-next';
import { Box, Button, Container } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid';
import { useEffect, useState, Fragment } from 'react';
import { toast } from 'react-toastify';
import { Field, NoteModel, Query } from 'src/api.types';
import { NoteModelsEditModalProvider, useNoteModelsEditModal } from 'src/bundles/UIAppBundle/contexts';
import {
  INoteModelCreated,
  INoteModelUpdated,
  NoteModelCreatedEvent,
  NoteModelUpdatedEvent,
} from 'src/bundles/UIAppBundle/events';
import { NoteModelsGetAll } from 'src/bundles/UIAppBundle/queries';
import { NoteModelsEditContainer } from '.';
import { DialogContainer, NoteModelsCreateContainer } from '../..';
import { DataGridContainer } from '../DataGrid';

const columns: GridColumns = [
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
      const [setOpen, setNoteModel] = useNoteModelsEditModal();

      const noteModel = params.row as NoteModel;

      const onClick = () => {
        setOpen(true);
        setNoteModel(noteModel);
      };

      return (
        <Box>
          <Button onClick={onClick}>Open</Button>
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

  const [createDialogIsOpened, setCreateDialogIsOpened] = useState(false);

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

    setCreateDialogIsOpened(false);

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

  if (error) return <UIComponents.Error error={error} />;

  const onDelete = async (id: string) => {
    toast.info('Not yet implemented.');
  };

  return (
    <Container>
      {loading ? (
        <UIComponents.Loader horizontalCenter verticalCenter />
      ) : (
        <Fragment>
          <NoteModelsEditModalProvider>
            <DataGridContainer
              {...{
                rows: noteModels,
                columns,
                onDelete,
                toolbarProps: {
                  onCreatePress: () => setCreateDialogIsOpened(true),
                },
              }}
            />
          </NoteModelsEditModalProvider>

          <DialogContainer
            {...{
              open: createDialogIsOpened,
              onClose: () => setCreateDialogIsOpened(false),

              title: 'Create Note Model',
            }}
          >
            <NoteModelsCreateContainer />
          </DialogContainer>
        </Fragment>
      )}
    </Container>
  );
};
