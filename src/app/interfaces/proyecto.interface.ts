export interface Proyecto {
    id: number;
    name: string;
    limit_date: string;
    department: string | null;
    created_at?: Date;
    is_active: boolean;
}

export interface ProjectTime {
    id: number;
    id_user: number;
    id_project: number;
    hours_by_project: number;
    date: Date;
}