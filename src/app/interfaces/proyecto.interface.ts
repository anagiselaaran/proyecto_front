export interface Proyecto {
    id: number;
    name: string;
    limit_date: string;
    department: string | null;
    create_at: Date;
    is_active: boolean;
}
