
export interface RegisterForm {
    nombre: string;
    email: string;
    password: string;
    role: 'ADMIN_ROLE'|'USER_ROLE';
}