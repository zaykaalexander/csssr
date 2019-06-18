import { combineEpics } from 'redux-observable';

import { getUsersEpic } from '^/users/epics';
import { getRepositoriesEpic } from '^/repositories/epics';
import { getIssueEpic, getIssuesEpic } from '^/issues/epics';

const rootEpic = combineEpics<any>(getUsersEpic, getRepositoriesEpic, getIssuesEpic, getIssueEpic);

export default rootEpic;
