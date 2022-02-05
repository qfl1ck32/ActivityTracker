import { Event } from '@bluelibs/core';
import { NoteModel } from 'src/api.types';

export interface INoteModelUpdated {
    noteModel: NoteModel;
}

export class NoteModelUpdatedEvent extends Event<INoteModelUpdated> { }
