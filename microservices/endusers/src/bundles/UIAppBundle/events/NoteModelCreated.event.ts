import { Event } from '@bluelibs/core';
import { NoteModel } from 'src/api.types';

export interface INoteModelCreated {
  noteModel: NoteModel;
}

export class NoteModelCreatedEvent extends Event<INoteModelCreated> {}
