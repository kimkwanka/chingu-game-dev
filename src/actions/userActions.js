export function hydrateUser(user) {
  return {
    type: 'HYDRATE_USER',
    user,
  };
}
