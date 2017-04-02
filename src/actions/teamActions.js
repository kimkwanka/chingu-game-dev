export function hydrateTeam(team) {
  return {
    type: 'HYDRATE_TEAM',
    team,
  };
}
export function changeTeamMemberLastLogin(userName, lastLogin) {
  return {
    type: 'CHANGE_TEAM_MEMBER_LAST_LOGIN',
    userName,
    lastLogin,
  };
}
export function changeTeamName(name, byUser) {
  return {
    type: 'CHANGE_TEAM_NAME',
    name,
    byUser,
  };
}
export function setCloneRepoURL(url) {
  return {
    type: 'SET_CLONE_REPO_URL',
    url,
  };
}
export function setCloneDeployURL(taskId) {
  return {
    type: 'SET_CLONE_DEPLOY_URL',
    taskId,
  };
}
