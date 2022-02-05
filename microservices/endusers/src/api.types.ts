export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date Custom scalar type */
  Date: any;
  /** The `EJSON` scalar type represents EJSON values as specified by [Meteor EJSON](https://docs.meteor.com/api/ejson.html). */
  EJSON: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** ObjectId custom scalar type */
  ObjectId: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Activity = {
  __typename?: 'Activity';
  _id?: Maybe<Scalars['ObjectId']>;
  /** Represents the date when this object was created */
  createdAt: Scalars['Date'];
  /** Represents the user who has created this object */
  createdBy?: Maybe<User>;
  /** Represents the user's id who has created this object */
  createdById?: Maybe<Scalars['ObjectId']>;
  name: Scalars['String'];
  /** Represents the last time when the object was updated */
  updatedAt: Scalars['Date'];
  /** Represents the user who has made the latest update on this object */
  updatedBy?: Maybe<User>;
  /** Represents the user's id who has made the latest update on this object */
  updatedById?: Maybe<Scalars['ObjectId']>;
};

export type ActivityInsertInput = {
  name: Scalars['String'];
};

export type ActivityLog = {
  __typename?: 'ActivityLog';
  _id?: Maybe<Scalars['ObjectId']>;
  activity: Activity;
  activityId: Scalars['ObjectId'];
  /** Represents the date when this object was created */
  createdAt: Scalars['Date'];
  /** Represents the user who has created this object */
  createdBy?: Maybe<User>;
  /** Represents the user's id who has created this object */
  createdById?: Maybe<Scalars['ObjectId']>;
  details: Array<Maybe<ActivityLogDetail>>;
  endUser: EndUser;
  endUserId: Scalars['ObjectId'];
  name: Scalars['String'];
  noteModel: NoteModel;
  noteModelId: Scalars['ObjectId'];
  /** Represents the last time when the object was updated */
  updatedAt: Scalars['Date'];
  /** Represents the user who has made the latest update on this object */
  updatedBy?: Maybe<User>;
  /** Represents the user's id who has made the latest update on this object */
  updatedById?: Maybe<Scalars['ObjectId']>;
};

export type ActivityLogDetail = {
  __typename?: 'ActivityLogDetail';
  _id?: Maybe<Scalars['ObjectId']>;
  activityLog: ActivityLog;
  activityLogId: Scalars['ObjectId'];
  /** Represents the date when this object was created */
  createdAt: Scalars['Date'];
  /** Represents the user who has created this object */
  createdBy?: Maybe<User>;
  /** Represents the user's id who has created this object */
  createdById?: Maybe<Scalars['ObjectId']>;
  endUser: EndUser;
  endUserId: Scalars['ObjectId'];
  name: Scalars['String'];
  note: ActivityNote;
  noteId: Scalars['ObjectId'];
  timing: ActivityTiming;
  timingId: Scalars['ObjectId'];
  /** Represents the last time when the object was updated */
  updatedAt: Scalars['Date'];
  /** Represents the user who has made the latest update on this object */
  updatedBy?: Maybe<User>;
  /** Represents the user's id who has made the latest update on this object */
  updatedById?: Maybe<Scalars['ObjectId']>;
};

export type ActivityLogDetailInsertInput = {
  activityLogId: Scalars['ObjectId'];
  endUserId: Scalars['ObjectId'];
  name: Scalars['String'];
  noteId: Scalars['ObjectId'];
  timingId: Scalars['ObjectId'];
};

export type ActivityLogDetailUpdateInput = {
  activityLogId?: Maybe<Scalars['ObjectId']>;
  endUserId?: Maybe<Scalars['ObjectId']>;
  name?: Maybe<Scalars['String']>;
  noteId?: Maybe<Scalars['ObjectId']>;
  timingId?: Maybe<Scalars['ObjectId']>;
};

export type ActivityLogInsertInput = {
  activityId: Scalars['ObjectId'];
  endUserId: Scalars['ObjectId'];
  name: Scalars['String'];
  noteModelId: Scalars['ObjectId'];
};

export type ActivityLogUpdateInput = {
  activityId?: Maybe<Scalars['ObjectId']>;
  endUserId?: Maybe<Scalars['ObjectId']>;
  name?: Maybe<Scalars['String']>;
  noteModelId?: Maybe<Scalars['ObjectId']>;
};

export type ActivityNote = {
  __typename?: 'ActivityNote';
  _id?: Maybe<Scalars['ObjectId']>;
  activityLogDetails: ActivityLogDetail;
  activityLogDetailsId: Scalars['ObjectId'];
  /** Represents the date when this object was created */
  createdAt: Scalars['Date'];
  /** Represents the user who has created this object */
  createdBy?: Maybe<User>;
  /** Represents the user's id who has created this object */
  createdById?: Maybe<Scalars['ObjectId']>;
  endUser: EndUser;
  endUserId: Scalars['ObjectId'];
  /** Represents the last time when the object was updated */
  updatedAt: Scalars['Date'];
  /** Represents the user who has made the latest update on this object */
  updatedBy?: Maybe<User>;
  /** Represents the user's id who has made the latest update on this object */
  updatedById?: Maybe<Scalars['ObjectId']>;
  /** We are representing the value as an object, because we don't have an exact representation of how the note will look like. */
  value: Scalars['String'];
};

export type ActivityNoteInsertInput = {
  activityLogDetailsId: Scalars['ObjectId'];
  endUserId: Scalars['ObjectId'];
  /** We are representing the value as an object, because we don't have an exact representation of how the note will look like. */
  value: Scalars['String'];
};

export type ActivityNoteUpdateInput = {
  activityLogDetailsId?: Maybe<Scalars['ObjectId']>;
  endUserId?: Maybe<Scalars['ObjectId']>;
  /** We are representing the value as an object, because we don't have an exact representation of how the note will look like. */
  value?: Maybe<Scalars['String']>;
};

export type ActivityTiming = {
  __typename?: 'ActivityTiming';
  _id?: Maybe<Scalars['ObjectId']>;
  activityLogDetails: ActivityLogDetail;
  activityLogDetailsId: Scalars['ObjectId'];
  /** Represents the date when this object was created */
  createdAt: Scalars['Date'];
  /** Represents the user who has created this object */
  createdBy?: Maybe<User>;
  /** Represents the user's id who has created this object */
  createdById?: Maybe<Scalars['ObjectId']>;
  endUser: EndUser;
  endUserId: Scalars['ObjectId'];
  finishedAt?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  startedAt: Scalars['Date'];
  /** Represents the last time when the object was updated */
  updatedAt: Scalars['Date'];
  /** Represents the user who has made the latest update on this object */
  updatedBy?: Maybe<User>;
  /** Represents the user's id who has made the latest update on this object */
  updatedById?: Maybe<Scalars['ObjectId']>;
};

export type ActivityTimingInsertInput = {
  activityLogDetailsId: Scalars['ObjectId'];
  endUserId: Scalars['ObjectId'];
  finishedAt?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  startedAt: Scalars['Date'];
};

export type ActivityTimingUpdateInput = {
  activityLogDetailsId?: Maybe<Scalars['ObjectId']>;
  endUserId?: Maybe<Scalars['ObjectId']>;
  finishedAt?: Maybe<Scalars['Date']>;
  name?: Maybe<Scalars['String']>;
  startedAt?: Maybe<Scalars['Date']>;
};

export type ActivityUpdateInput = {
  name?: Maybe<Scalars['String']>;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  country: Scalars['String'];
};

export type AddressInput = {
  city: Scalars['String'];
  country: Scalars['String'];
};

export type AppFile = {
  __typename?: 'AppFile';
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  downloadUrl: Scalars['String'];
  size: Scalars['Int'];
  mimeType: Scalars['String'];
  thumbs: Array<Maybe<AppFileThumb>>;
  resourceType?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
  uploadedById?: Maybe<Scalars['String']>;
  uploadedBy?: Maybe<User>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};


export type AppFilethumbsArgs = {
  ids?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AppFileGroup = {
  __typename?: 'AppFileGroup';
  _id: Scalars['ObjectId'];
  name?: Maybe<Scalars['String']>;
  files: Array<Maybe<AppFile>>;
  filesIds: Array<Maybe<Scalars['ObjectId']>>;
};

export type AppFileThumb = {
  __typename?: 'AppFileThumb';
  /** @deprecated Use 'type' instead, due to cache mismatch with Apollo */
  id: Scalars['String'];
  type: Scalars['String'];
  path: Scalars['String'];
  downloadUrl: Scalars['String'];
};

export type ChangePasswordInput = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type DocumentUpdateInput = {
  _id: Scalars['ObjectId'];
  modifier: Scalars['EJSON'];
};


export type EndUser = {
  __typename?: 'EndUser';
  _id?: Maybe<Scalars['ObjectId']>;
  activityLogs: Array<Maybe<ActivityLog>>;
  /** Represents the date when this object was created */
  createdAt: Scalars['Date'];
  /** Represents the user who has created this object */
  createdBy?: Maybe<User>;
  /** Represents the user's id who has created this object */
  createdById?: Maybe<Scalars['ObjectId']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  lastName: Scalars['String'];
  owner: User;
  ownerId: Scalars['ObjectId'];
  /** Represents the last time when the object was updated */
  updatedAt: Scalars['Date'];
  /** Represents the user who has made the latest update on this object */
  updatedBy?: Maybe<User>;
  /** Represents the user's id who has made the latest update on this object */
  updatedById?: Maybe<Scalars['ObjectId']>;
};

export type EndUserInsertInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  ownerId: Scalars['ObjectId'];
};

export type EndUserUpdateInput = {
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['ObjectId']>;
};

export type EndUsersActivityLogDetailsCreateInput = {
  activityLogId: Scalars['ObjectId'];
  startedAt: Scalars['Date'];
  finishedAt: Scalars['Date'];
  noteDetailsValue?: Maybe<Scalars['String']>;
};

export type EndUsersActivityLogsCreateInput = {
  activityId: Scalars['ObjectId'];
  noteModelId: Scalars['ObjectId'];
  name: Scalars['String'];
};

export type EndUsersActivityLogsGetOneInput = {
  activityLogId: Scalars['ObjectId'];
};

export type EndUsersActivityNotesUpdateInput = {
  activityLogDetailsId: Scalars['ObjectId'];
  value: Scalars['String'];
};

export type EndUsersNoteModelsCreateInput = {
  name: Scalars['String'];
  fields: Array<Maybe<FieldInput>>;
};

export type EndUsersNoteModelsUpdateInput = {
  noteModelId: Scalars['ObjectId'];
  fields: Array<Maybe<FieldInputWithEnumValues>>;
  name?: Maybe<Scalars['String']>;
};

export type EndUsersRegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Field = {
  __typename?: 'Field';
  id: Scalars['String'];
  name: Scalars['String'];
  type: FieldType;
  enumValues: Array<Maybe<FieldEnumValues>>;
};

export type FieldEnumValues = {
  __typename?: 'FieldEnumValues';
  id: Scalars['String'];
  value: Scalars['String'];
};

export type FieldEnumValuesInput = {
  id: Scalars['String'];
  value: Scalars['String'];
};

export type FieldInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: FieldType;
  enumValues: Array<Maybe<Scalars['String']>>;
};

export type FieldInputWithEnumValues = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: FieldType;
  enumValues: Array<Maybe<FieldEnumValuesInput>>;
};

export type FieldRules = {
  __typename?: 'FieldRules';
  enumValues: Array<Maybe<FieldEnumValues>>;
};

export type FieldRulesInput = {
  enumValues: Array<Maybe<FieldEnumValuesInput>>;
};

export enum FieldType {
  BOOLEAN = 'BOOLEAN',
  ENUM = 'ENUM',
  NUMBER = 'NUMBER',
  STRING = 'STRING'
}

export type ForgotPasswordInput = {
  email: Scalars['String'];
};



export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** This mutation is used to create a new token based on the existing one. Your previous token will no longer be usable. */
  reissueToken: Scalars['String'];
  ActivitiesInsertOne?: Maybe<Activity>;
  ActivitiesUpdateOne: Activity;
  ActivitiesDeleteOne?: Maybe<Scalars['Boolean']>;
  ActivityLogDetailsInsertOne?: Maybe<ActivityLogDetail>;
  ActivityLogDetailsUpdateOne: ActivityLogDetail;
  ActivityLogDetailsDeleteOne?: Maybe<Scalars['Boolean']>;
  ActivityLogsInsertOne?: Maybe<ActivityLog>;
  ActivityLogsUpdateOne: ActivityLog;
  ActivityLogsDeleteOne?: Maybe<Scalars['Boolean']>;
  ActivityNotesInsertOne?: Maybe<ActivityNote>;
  ActivityNotesUpdateOne: ActivityNote;
  ActivityNotesDeleteOne?: Maybe<Scalars['Boolean']>;
  ActivityTimingsInsertOne?: Maybe<ActivityTiming>;
  ActivityTimingsUpdateOne: ActivityTiming;
  ActivityTimingsDeleteOne?: Maybe<Scalars['Boolean']>;
  EndUsersInsertOne?: Maybe<EndUser>;
  EndUsersUpdateOne: EndUser;
  EndUsersDeleteOne?: Maybe<Scalars['Boolean']>;
  NoteModelsInsertOne?: Maybe<NoteModel>;
  NoteModelsUpdateOne: NoteModel;
  NoteModelsDeleteOne?: Maybe<Scalars['Boolean']>;
  AppFileGroupsInsertOne?: Maybe<AppFileGroup>;
  AppFilesDeleteOne?: Maybe<Scalars['Boolean']>;
  AppFileGroupsDeleteOne?: Maybe<Scalars['Boolean']>;
  AppFileUploadToGroup?: Maybe<AppFile>;
  AppFileUpload?: Maybe<AppFile>;
  UsersInsertOne?: Maybe<User>;
  UsersUpdateOne: User;
  UsersDeleteOne?: Maybe<Scalars['Boolean']>;
  EndUsersActivityLogDetailsCreate: ActivityLogDetail;
  EndUsersActivityLogsCreate: ActivityLog;
  EndUsersActivityNotesUpdate: ActivityNote;
  EndUsersNoteModelsCreate: NoteModel;
  EndUsersNoteModelsUpdate: NoteModel;
  EndUsersRegister?: Maybe<Scalars['Boolean']>;
  register: RegistrationResponse;
  changePassword?: Maybe<Scalars['Boolean']>;
  login: LoginResponse;
  logout?: Maybe<Scalars['Boolean']>;
  resetPassword: ResetPasswordResponse;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  verifyEmail: VerifyEmailResponse;
};


export type MutationreissueTokenArgs = {
  token: Scalars['String'];
};


export type MutationActivitiesInsertOneArgs = {
  document: ActivityInsertInput;
};


export type MutationActivitiesUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  document: ActivityUpdateInput;
};


export type MutationActivitiesDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationActivityLogDetailsInsertOneArgs = {
  document: ActivityLogDetailInsertInput;
};


export type MutationActivityLogDetailsUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  document: ActivityLogDetailUpdateInput;
};


export type MutationActivityLogDetailsDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationActivityLogsInsertOneArgs = {
  document: ActivityLogInsertInput;
};


export type MutationActivityLogsUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  document: ActivityLogUpdateInput;
};


export type MutationActivityLogsDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationActivityNotesInsertOneArgs = {
  document: ActivityNoteInsertInput;
};


export type MutationActivityNotesUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  document: ActivityNoteUpdateInput;
};


export type MutationActivityNotesDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationActivityTimingsInsertOneArgs = {
  document: ActivityTimingInsertInput;
};


export type MutationActivityTimingsUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  document: ActivityTimingUpdateInput;
};


export type MutationActivityTimingsDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationEndUsersInsertOneArgs = {
  document: EndUserInsertInput;
};


export type MutationEndUsersUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  document: EndUserUpdateInput;
};


export type MutationEndUsersDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationNoteModelsInsertOneArgs = {
  document: NoteModelInsertInput;
};


export type MutationNoteModelsUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  document: NoteModelUpdateInput;
};


export type MutationNoteModelsDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationAppFileGroupsInsertOneArgs = {
  document: Scalars['EJSON'];
};


export type MutationAppFilesDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationAppFileGroupsDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationAppFileUploadToGroupArgs = {
  groupId: Scalars['ObjectId'];
  upload: Scalars['Upload'];
  context?: Maybe<Scalars['String']>;
};


export type MutationAppFileUploadArgs = {
  upload: Scalars['Upload'];
  context?: Maybe<Scalars['String']>;
};


export type MutationUsersInsertOneArgs = {
  document: UserInsertInput;
};


export type MutationUsersUpdateOneArgs = {
  _id: Scalars['ObjectId'];
  document: UserUpdateInput;
};


export type MutationUsersDeleteOneArgs = {
  _id: Scalars['ObjectId'];
};


export type MutationEndUsersActivityLogDetailsCreateArgs = {
  input: EndUsersActivityLogDetailsCreateInput;
};


export type MutationEndUsersActivityLogsCreateArgs = {
  input: EndUsersActivityLogsCreateInput;
};


export type MutationEndUsersActivityNotesUpdateArgs = {
  input: EndUsersActivityNotesUpdateInput;
};


export type MutationEndUsersNoteModelsCreateArgs = {
  input: EndUsersNoteModelsCreateInput;
};


export type MutationEndUsersNoteModelsUpdateArgs = {
  input: EndUsersNoteModelsUpdateInput;
};


export type MutationEndUsersRegisterArgs = {
  input: EndUsersRegisterInput;
};


export type MutationregisterArgs = {
  input: RegistrationInput;
};


export type MutationchangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationloginArgs = {
  input: LoginInput;
};


export type MutationresetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationforgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationverifyEmailArgs = {
  input: VerifyEmailInput;
};

export type NoteModel = {
  __typename?: 'NoteModel';
  _id?: Maybe<Scalars['ObjectId']>;
  /** Represents the date when this object was created */
  createdAt: Scalars['Date'];
  endUser: EndUser;
  endUserId: Scalars['ObjectId'];
  fields: Array<Maybe<Field>>;
  name: Scalars['String'];
  /** Represents the last time when the object was updated */
  updatedAt: Scalars['Date'];
};

export type NoteModelInsertInput = {
  endUserId: Scalars['ObjectId'];
  fields: Array<Maybe<FieldInput>>;
  name: Scalars['String'];
};

export type NoteModelUpdateInput = {
  endUserId?: Maybe<Scalars['ObjectId']>;
  fields?: Maybe<Array<Maybe<FieldInput>>>;
  name?: Maybe<Scalars['String']>;
};


export type Query = {
  __typename?: 'Query';
  ActivitiesFindOne?: Maybe<Activity>;
  ActivitiesFindOneByID?: Maybe<Activity>;
  ActivitiesFind: Array<Maybe<Activity>>;
  ActivitiesCount: Scalars['Int'];
  ActivityLogDetailsFindOne?: Maybe<ActivityLogDetail>;
  ActivityLogDetailsFindOneByID?: Maybe<ActivityLogDetail>;
  ActivityLogDetailsFind: Array<Maybe<ActivityLogDetail>>;
  ActivityLogDetailsCount: Scalars['Int'];
  ActivityLogsFindOne?: Maybe<ActivityLog>;
  ActivityLogsFindOneByID?: Maybe<ActivityLog>;
  ActivityLogsFind: Array<Maybe<ActivityLog>>;
  ActivityLogsCount: Scalars['Int'];
  ActivityNotesFindOne?: Maybe<ActivityNote>;
  ActivityNotesFindOneByID?: Maybe<ActivityNote>;
  ActivityNotesFind: Array<Maybe<ActivityNote>>;
  ActivityNotesCount: Scalars['Int'];
  ActivityTimingsFindOne?: Maybe<ActivityTiming>;
  ActivityTimingsFindOneByID?: Maybe<ActivityTiming>;
  ActivityTimingsFind: Array<Maybe<ActivityTiming>>;
  ActivityTimingsCount: Scalars['Int'];
  EndUsersFindOne?: Maybe<EndUser>;
  EndUsersFindOneByID?: Maybe<EndUser>;
  EndUsersFind: Array<Maybe<EndUser>>;
  EndUsersCount: Scalars['Int'];
  NoteModelsFindOne?: Maybe<NoteModel>;
  NoteModelsFindOneByID?: Maybe<NoteModel>;
  NoteModelsFind: Array<Maybe<NoteModel>>;
  NoteModelsCount: Scalars['Int'];
  AppFilesFindOne?: Maybe<AppFile>;
  AppFilesFind?: Maybe<Array<Maybe<AppFile>>>;
  AppFileGroupsFindOne?: Maybe<AppFileGroup>;
  AppFileGroupsFind?: Maybe<Array<Maybe<AppFileGroup>>>;
  UsersFindOne?: Maybe<User>;
  UsersFindOneByID?: Maybe<User>;
  UsersFind: Array<Maybe<User>>;
  UsersCount: Scalars['Int'];
  EndUsersActivitiesGetAll: Array<Maybe<Activity>>;
  EndUsersActivityLogsGetAll: Array<Maybe<ActivityLog>>;
  EndUsersActivityLogsGetOne: ActivityLog;
  EndUsersNoteModelsGetAll: Array<Maybe<NoteModel>>;
  me: User;
  framework?: Maybe<Scalars['String']>;
};


export type QueryActivitiesFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryActivitiesFindOneByIDArgs = {
  _id: Scalars['ObjectId'];
};


export type QueryActivitiesFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryActivitiesCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryActivityLogDetailsFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryActivityLogDetailsFindOneByIDArgs = {
  _id: Scalars['ObjectId'];
};


export type QueryActivityLogDetailsFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryActivityLogDetailsCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryActivityLogsFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryActivityLogsFindOneByIDArgs = {
  _id: Scalars['ObjectId'];
};


export type QueryActivityLogsFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryActivityLogsCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryActivityNotesFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryActivityNotesFindOneByIDArgs = {
  _id: Scalars['ObjectId'];
};


export type QueryActivityNotesFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryActivityNotesCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryActivityTimingsFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryActivityTimingsFindOneByIDArgs = {
  _id: Scalars['ObjectId'];
};


export type QueryActivityTimingsFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryActivityTimingsCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryEndUsersFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryEndUsersFindOneByIDArgs = {
  _id: Scalars['ObjectId'];
};


export type QueryEndUsersFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryEndUsersCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryNoteModelsFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryNoteModelsFindOneByIDArgs = {
  _id: Scalars['ObjectId'];
};


export type QueryNoteModelsFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryNoteModelsCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryAppFilesFindOneArgs = {
  query: QueryInput;
};


export type QueryAppFilesFindArgs = {
  query: QueryInput;
};


export type QueryAppFileGroupsFindOneArgs = {
  query: QueryInput;
};


export type QueryAppFileGroupsFindArgs = {
  query: QueryInput;
};


export type QueryUsersFindOneArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryUsersFindOneByIDArgs = {
  _id: Scalars['ObjectId'];
};


export type QueryUsersFindArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryUsersCountArgs = {
  query?: Maybe<QueryInput>;
};


export type QueryEndUsersActivityLogsGetOneArgs = {
  input: EndUsersActivityLogsGetOneInput;
};

export type QueryInput = {
  filters?: Maybe<Scalars['EJSON']>;
  options?: Maybe<QueryOptionsInput>;
};

export type QueryOptionsInput = {
  sort?: Maybe<Scalars['JSON']>;
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  /** This is the Nova body that will get merged deeply with your request body. Useful for passing arguments. */
  sideBody?: Maybe<Scalars['EJSON']>;
};

export type RegistrationInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegistrationResponse = {
  __typename?: 'RegistrationResponse';
  /** Please not that if the user is required to validate his email for logging in, token will be null */
  token?: Maybe<Scalars['String']>;
};

export type ResetPasswordInput = {
  username: Scalars['String'];
  token: Scalars['String'];
  newPassword: Scalars['String'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  token: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  ActivitiesSubscription?: Maybe<SubscriptionEvent>;
  ActivitiesSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  ActivityLogDetailsSubscription?: Maybe<SubscriptionEvent>;
  ActivityLogDetailsSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  ActivityLogsSubscription?: Maybe<SubscriptionEvent>;
  ActivityLogsSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  ActivityNotesSubscription?: Maybe<SubscriptionEvent>;
  ActivityNotesSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  ActivityTimingsSubscription?: Maybe<SubscriptionEvent>;
  ActivityTimingsSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  EndUsersSubscription?: Maybe<SubscriptionEvent>;
  EndUsersSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  NoteModelsSubscription?: Maybe<SubscriptionEvent>;
  NoteModelsSubscriptionCount?: Maybe<SubscriptionCountEvent>;
  UsersSubscription?: Maybe<SubscriptionEvent>;
  UsersSubscriptionCount?: Maybe<SubscriptionCountEvent>;
};


export type SubscriptionActivitiesSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionActivitiesSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionActivityLogDetailsSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionActivityLogDetailsSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionActivityLogsSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionActivityLogsSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionActivityNotesSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionActivityNotesSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionActivityTimingsSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionActivityTimingsSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionEndUsersSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionEndUsersSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionNoteModelsSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionNoteModelsSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionUsersSubscriptionArgs = {
  body?: Maybe<Scalars['EJSON']>;
};


export type SubscriptionUsersSubscriptionCountArgs = {
  filters?: Maybe<Scalars['EJSON']>;
};

export type SubscriptionCountEvent = {
  __typename?: 'SubscriptionCountEvent';
  count?: Maybe<Scalars['Int']>;
};

export type SubscriptionEvent = {
  __typename?: 'SubscriptionEvent';
  event: SubscriptionEventType;
  document?: Maybe<Scalars['EJSON']>;
};

export enum SubscriptionEventType {
  added = 'added',
  changed = 'changed',
  removed = 'removed',
  ready = 'ready'
}


export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ObjectId']>;
  /** Represents the date when this object was created */
  createdAt: Scalars['Date'];
  /** Represents the user who has created this object */
  createdBy?: Maybe<User>;
  /** Represents the user's id who has created this object */
  createdById?: Maybe<Scalars['ObjectId']>;
  email: Scalars['String'];
  endUser: Array<Maybe<EndUser>>;
  fullName: Scalars['String'];
  isEnabled: Scalars['Boolean'];
  profile: UserProfile;
  roles: Array<Maybe<UserRole>>;
  /** Represents the last time when the object was updated */
  updatedAt: Scalars['Date'];
  /** Represents the user who has made the latest update on this object */
  updatedBy?: Maybe<User>;
  /** Represents the user's id who has made the latest update on this object */
  updatedById?: Maybe<Scalars['ObjectId']>;
};

export type UserInsertInput = {
  isEnabled: Scalars['Boolean'];
  profile: UserProfileInput;
  roles: Array<Maybe<UserRole>>;
};

export type UserProfile = {
  __typename?: 'UserProfile';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type UserProfileInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export enum UserRole {
  ADMIN = 'ADMIN',
  END_USER = 'END_USER'
}

export type UserUpdateInput = {
  isEnabled?: Maybe<Scalars['Boolean']>;
  profile?: Maybe<UserProfileInput>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
};

export type VerifyEmailInput = {
  username?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  token: Scalars['String'];
};
