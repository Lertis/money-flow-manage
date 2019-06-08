export interface ICheck {
    checkId: string;
    title: string;
    description?: string;
    category?: string;
    summary: number;
    addedAt?: Date | number | any;
    addedPhoto?: string;
}