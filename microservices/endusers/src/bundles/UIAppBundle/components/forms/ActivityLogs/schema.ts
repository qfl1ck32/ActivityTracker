import * as yup from 'yup';

export const schema = yup.object({
  name: yup.string().required(),
  noteModelId: yup.string().required().notOneOf(['none'], 'Please select a note model.'),
  activityId: yup.string().required().notOneOf(['none'], 'Please select an activity.'),
});
