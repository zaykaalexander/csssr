import { UserModel } from '^/users/models';

export type IssueModel = {
  number: number;
  title: string;
  created_at: string;
  updated_at: string;
  user: UserModel;
  body: string;
};
