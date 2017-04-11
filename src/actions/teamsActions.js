export function hydrateTeams(teams) {
  return {
    type: 'HYDRATE_TEAMS',
    teams,
  };
}
