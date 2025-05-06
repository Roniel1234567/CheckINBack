"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleDescription = exports.isValidRole = exports.ROLE_PERMISSIONS = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole[UserRole["ADMIN"] = 1] = "ADMIN";
    UserRole[UserRole["ESTUDIANTE"] = 2] = "ESTUDIANTE";
    UserRole[UserRole["SUPERVISOR"] = 3] = "SUPERVISOR";
    UserRole[UserRole["TUTOR"] = 4] = "TUTOR";
    UserRole[UserRole["RECURSOS_HUMANOS"] = 5] = "RECURSOS_HUMANOS";
    UserRole[UserRole["EMPRESA"] = 6] = "EMPRESA";
    UserRole[UserRole["OBSERVADOR"] = 7] = "OBSERVADOR";
})(UserRole || (exports.UserRole = UserRole = {}));
exports.ROLE_PERMISSIONS = {
    [UserRole.ADMIN]: [
        'access:all',
        'manage:users',
        'manage:system',
        'view:reports',
        'manage:configuration'
    ],
    [UserRole.ESTUDIANTE]: [
        'attendance:mark',
        'excuse:create',
        'hours:register',
        'activities:register',
        'activities:edit:30min',
        'company:evaluate',
        'grades:view'
    ],
    [UserRole.SUPERVISOR]: [
        'excuse:manage',
        'attendance:manage',
        'student:evaluate',
        'activities:validate'
    ],
    [UserRole.TUTOR]: [
        'hours:validate',
        'company:manage',
        'placement:manage',
        'visits:manage',
        'attendance:manage',
        'students:supervise'
    ],
    [UserRole.RECURSOS_HUMANOS]: [
        'excuse:validate',
        'documents:validate',
        'hours:validate',
        'reports:view'
    ],
    [UserRole.EMPRESA]: [
        'company:register',
        'placement:create',
        'placement:manage',
        'internship:manage',
        'student:evaluate'
    ],
    [UserRole.OBSERVADOR]: [
        'system:view'
    ]
};
const isValidRole = (role) => {
    return Object.values(UserRole).includes(role);
};
exports.isValidRole = isValidRole;
const getRoleDescription = (role) => {
    const descriptions = {
        [UserRole.ADMIN]: 'Acceso completo al sistema',
        [UserRole.ESTUDIANTE]: 'Gestión de asistencia, actividades y evaluaciones',
        [UserRole.SUPERVISOR]: 'Supervisión de estudiantes y gestión de excusas',
        [UserRole.TUTOR]: 'Gestión de empresas, visitas y supervisión de estudiantes',
        [UserRole.RECURSOS_HUMANOS]: 'Validación de documentos y horas',
        [UserRole.EMPRESA]: 'Gestión de plazas y pasantías',
        [UserRole.OBSERVADOR]: 'Acceso de solo lectura al sistema'
    };
    return descriptions[role] || 'Rol no definido';
};
exports.getRoleDescription = getRoleDescription;
