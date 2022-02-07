import { Activity } from "../collections";

export default {
  users: [
    {
      _id: { $objectId: "6201555074155f9ada97e35b" },
      roles: ["ADMIN"],
      isDeleted: false,
      password: {},
      isEnabled: true,
      profile: { firstName: "Rusu", lastName: "Andrei-Cristian" },
    },
  ],

  activities: [
    {
      name: "Calisthenics",
    },
    {
      name: "Reading",
    },
    {
      name: "Relaxing",
    },
  ] as Activity[],

  activityLogDetails: [],
  activityLogs: [],
  activityNotes: [],
  activityTimings: [],

  endUsers: [],
  noteModels: [],
};
