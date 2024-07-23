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

export interface Password {
    oldPassword: string;
    newPassword: string;
    newRepPassword: string;
}

export interface UserProjects {
    id: number;
    name: string;
    project_work_hours: number;
    start_date: Date;
}