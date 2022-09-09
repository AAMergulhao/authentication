const hasRole = (userRoles: string[], allowedRoles: string[]): boolean => {
  for (const role of allowedRoles) {
    if (userRoles.includes(role)) return true;
  }

  return false;
};

export default hasRole;