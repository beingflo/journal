export type Screens = 'help' | 'config' | 'app' | 'feedback';

export type Entry = {
  id: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  deletedAt?: string;
};

export type State = {
  selectedProject: string;
  help: boolean;
  screen: Screens;
  s3: object;
  entries: Array<Entry>;
};
