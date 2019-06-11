import { IUserCategories } from './user.categories';

export interface IUser {
    userId?: string;
    userName?: string;
    userEmail: string;
    userPassword: string;
    userPhoto?: any;
    categories?: IUserCategories[];
}