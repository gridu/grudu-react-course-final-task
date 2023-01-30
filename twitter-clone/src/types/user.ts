export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}


// TODO: naming convention for this type. should be more specific, like 'AuthenticatedUser'.
export interface UserAuth { // TODO: additional type should be extended from the basic one https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types
    user: User;
    isAuthenticated: boolean;
}
