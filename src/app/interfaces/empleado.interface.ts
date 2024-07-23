export interface Empleado {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
    department: string;
    contracted_hours: number;
    is_active: boolean;
    created_at?: Date;
    updated_at?: Date;
}