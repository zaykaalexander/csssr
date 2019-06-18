import * as constants from './constants';
import { IssueModel } from './models';
import { AxiosError } from 'axios';

/*== GET ISSUES ==*/
export type GetIssuesType = {
  type: typeof constants.GET_ISSUES;
  user: string;
  repository: string;
  page?: number;
  limit?: number;
};

export const getIssues = (user: string, repository: string, page?: number, limit?: number) => ({
  type: constants.GET_ISSUES,
  user,
  repository,
  page,
  limit,
});

/*== GET ISSUES FAIL ==*/
export type GetIssuesFailType = {
  type: typeof constants.GET_ISSUES_FAIL;
  error: string;
};

export const getIssuesFail = (error: AxiosError) => ({
  type: constants.GET_ISSUES_FAIL,
  error,
});

/*== GET ISSUES FINISH ==*/
export type GetIssuesFinishType = {
  type: typeof constants.GET_ISSUES_FINISH;
  issues: IssueModel[];
  lastPage?: number;
};
export const getIssuesFinish = (issues: IssueModel[], lastPage?: number) => ({
  type: constants.GET_ISSUES_FINISH,
  issues,
  lastPage,
});

/*== GET ISSUE ==*/
export type GetIssueType = {
  type: typeof constants.GET_ISSUE;
  user: string;
  repository: string;
  issue: number;
};

export const getIssue = (user: string, repository: string, issue: number) => ({
  type: constants.GET_ISSUE,
  user,
  repository,
  issue,
});

/*== GET ISSUE FAIL ==*/
export type GetIssueFailType = {
  type: typeof constants.GET_ISSUE_FAIL;
  error: string;
};

export const getIssueFail = (error: AxiosError) => ({
  type: constants.GET_ISSUE_FAIL,
  error,
});

/*== GET ISSUE FINISH ==*/
export type GetIssueFinishType = {
  type: typeof constants.GET_ISSUE_FINISH;
  issue: IssueModel;
};
export const getIssueFinish = (issue: IssueModel) => ({
  type: constants.GET_ISSUE_FINISH,
  issue,
});
