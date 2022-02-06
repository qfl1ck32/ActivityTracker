import { Routes } from '../..';

export type HeaderLinkType = {
  name: string;

  url: string;
};

export const pagesLoggedIn = [
  {
    name: 'Home',
    url: Routes.Home.path,
  },
  {
    name: 'Activity Logs',
    url: Routes.ActivityLogs.path,
  },
  {
    name: 'Note Models',
    url: Routes.NoteModels.path,
  },
] as HeaderLinkType[];

export const pagesNotLoggedIn = [
  {
    name: 'Home',
    url: Routes.Home.path,
  },
] as HeaderLinkType[];

export const settingsLoggedIn = [
  {
    name: 'Profile',
    url: Routes.Profile.path,
  },
  {
    name: 'Logout',
    url: Routes.Logout.path,
  },
] as HeaderLinkType[];

export const settingsNotLoggedIn = [
  {
    name: 'Login',
    url: Routes.Login.path,
  },
] as HeaderLinkType[];
