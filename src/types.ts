export type Screens = 'help' | 'config' | 'app' | 'feedback';

export type Tag = {
  id: string;
  name: string;
  createdAt: number;
  modifiedAt: number;
  deletedAt?: number;
};

export type Entry = {
  id: string;
  content: string;
  createdAt: number;
  modifiedAt?: number;
  deletedAt?: number;
};

export type State = {
  selectedTag: string;
  help: boolean;
  screen: Screens;
  s3: object;
  entries: Array<Entry>;
  tags: Array<Tag>;
};
