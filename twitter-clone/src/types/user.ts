export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}


export interface UserAuth {
    user: User;
    isAuthenticated: boolean;
}
