export interface User {
    id: string;
    name: string;
}

export interface UserId {
    user_id: string;
}

export interface UserList {
    users: User[];
}