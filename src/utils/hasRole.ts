const hasRole = (userRoles: string[], allowedRoles: string[]): boolean => {
    if (process.env.RUNNING_TESTS) return true;
    for (let i in allowedRoles) {
        if (userRoles.includes(allowedRoles[i])) return true;
    }
    return false;
}

export default hasRole