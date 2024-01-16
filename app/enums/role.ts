

enum Role {
    MEMBER='MEMBER',
    ADMIN='ADMIN',
    SUPERADMIN='SUPERADMIN'
}

export const adminRoles = [Role.ADMIN, Role.SUPERADMIN];
export const superAdminRoles = [Role.SUPERADMIN];
export const allRoles = [Role.MEMBER, Role.ADMIN, Role.SUPERADMIN];

export default Role;