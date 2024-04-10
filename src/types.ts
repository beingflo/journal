export type Screens = 'help' | 'config' | 'app' | 'feedback' | 'stats';

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
  modifiedAt: number;
  deletedAt?: number;
};

export type State = {
  selectedAutoTags: Array<string>;
  help: boolean;
  screen: Screens;
  s3: object;
  entries: Array<Entry>;
  tags: Array<Tag>;
};
