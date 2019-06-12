import { IUserCategories } from './user.categories';
import { ICategoriesList } from './categories.list.onterface';

export interface IUser {
    userId?: string;
    userName?: string;
    userEmail: string;
    userPassword: string;
    userPhoto?: any;
    categories?: ICategoriesList;
} 