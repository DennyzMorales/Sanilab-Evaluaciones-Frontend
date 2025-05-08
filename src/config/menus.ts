// config/menus.ts
export type UserRole = 'admin' | 'user'

interface MenuItem {
  label: string
  path: string
}   

export const menus: Record<UserRole, MenuItem[]> = {
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Usuarios', path: '/admin/users' }
  ],
  user: [
    { label: 'Inicio', path: '/user/home' },
    { label: 'Mis Evaluaciones', path: '/user/evaluations' }
  ]
}
