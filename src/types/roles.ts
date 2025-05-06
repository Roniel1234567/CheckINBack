export enum UserRole {
  ADMIN = 1,
  ESTUDIANTE = 2,
  SUPERVISOR = 3,
  TUTOR = 4,
  RECURSOS_HUMANOS = 5,
  EMPRESA = 6,
  OBSERVADOR = 7
}

export const ROLE_PERMISSIONS = {
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

export const isValidRole = (role: number): boolean => {
  return Object.values(UserRole).includes(role);
};

export const getRoleDescription = (role: UserRole): string => {
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