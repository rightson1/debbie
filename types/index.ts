import React from "react";
export type SocialIconsTypes = {
  Facebook: JSX.Element;
  Twitter: JSX.Element;
  Instagram: JSX.Element;
  LinkedIn: JSX.Element;
  YouTube: JSX.Element;
  GitHub: JSX.Element;
  Website: JSX.Element;
  Gmail: JSX.Element;
  WhatsApp: JSX.Element;
};

export interface childrenProps {
  children: React.ReactNode;
}
export type mode = "light" | "dark";
type Shades = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type ColorShades = {
  [key in Shades]: string;
};
export interface openProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface menuType {
  name: string;
  links: {
    name: string;
    icon: React.JSX.Element;
    info?: string;
    link: string;
    active?: boolean;
  }[];
}
export interface Admin {
  email: string;
  uid: string;
  displayName: string;
}

export interface TokenColors {
  background: string;
  surface: string;
  active: string;
  white: string;
  indigo: ColorShades;
  green: ColorShades;
  red: ColorShades;
  text: string;
  textSecondary: string;
  card: string;
}
interface Fetched {
  _id: string;
  createdAt: string;
}
export interface User {
  displayName: string;
  photoURL?: string;
  email: string;
  uid: string;
  admin: boolean;
}

export interface Candidate {
  userId: string;
  position: string;
  photo: string;
  bio: string;
  story?: string;
}
export interface CandidateFetched extends Candidate, Fetched {
  user: UserFetched;
}
export interface UserFetched extends User, Fetched {}
export interface Notification {
  title: string;
  body: string;
  views: string[];
}

export interface IPosition {
  name: string;
}
export interface IPositionFetched extends IPosition, Fetched {}
export interface NotificationFetched extends Notification, Fetched {}
export interface Vote {
  voterId: string;
  post: IPosition;
  candidateId: string;
  candidateUserId: string;
}
export interface VoteFetched {
  post: IPositionFetched;
  label: string;
  value: number;
  id: string;
}
export interface Settings {
  electionStatus: "open" | "closed";
}
export interface SettingsFetched extends Settings, Fetched {}
export type ElectionStatus = "open" | "closed";
