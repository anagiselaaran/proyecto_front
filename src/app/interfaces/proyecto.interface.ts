export interface Proyecto {
    id: number;
    name: string;
    limit_date: string;
    department: string | null;
    created_at?: Date;
    is_active: boolean;
}