export interface Proyecto {
    id: number;
    nombre: string;
    fecha_limite: string;
    department: string | null;
    create_at: Date;
    is_active: boolean;
}