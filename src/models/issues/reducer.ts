import * as constants from './constants';
import { IssueModel } from './models';
import {
  GetIssuesType,
  GetIssuesFailType,
  GetIssuesFinishType,
  GetIssueType,
  GetIssueFailType,
  GetIssueFinishType,
} from './actions';
import { AxiosError } from 'axios';

export type IssuesActionType =
  | GetIssuesType
  | GetIssuesFailType
  | GetIssuesFinishType
  | GetIssueType
  | GetIssueFailType
  | GetIssueFinishType;

export type IssuesListType = {
  status?: string;
  error?: AxiosError;
  items: IssueModel[];
  last_page?: number;
};

export type IssuesItemType = {
  status?: string;
  error?: AxiosError;
  item?: IssueModel;
};

export type IssuesReducerStateType = {
  list: IssuesListType;
  issue: IssuesItemType;
};

const initialState: IssuesReducerStateType = {
  list: {
    items: [],
  },
  issue: {},
};

export default (state = initialState, action: IssuesActionType) => {
  switch (action.type) {
    case constants.GET_ISSUES:
      return { ...state, list: { ...state.list, status: 'LOADING', error: undefined } };
    case constants.GET_ISSUES_FAIL:
      return { ...state, list: { ...state.list, status: 'FAIL', error: action.error } };
    case constants.GET_ISSUES_FINISH:
      return {
        ...state,
        list: { ...state.list, status: 'LOADED', items: action.issues, last_page: action.lastPage },
      };
    case constants.GET_ISSUE:
      return { ...state, issue: { ...state.issue, status: 'LOADING', error: undefined } };
    case constants.GET_ISSUE_FAIL:
      return { ...state, issue: { ...state.issue, status: 'FAIL', error: action.error } };
    case constants.GET_ISSUE_FINISH:
      return { ...state, issue: { ...state.issue, status: 'LOADED', item: action.issue } };
    default:
      return state;
  }
};
