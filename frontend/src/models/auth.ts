export interface Login {
    name: FormDataEntryValue | null
    password: FormDataEntryValue | null;
}

export interface LoginResponse {
    message: string;
}

export interface Signup {
    name: FormDataEntryValue | null
    password: FormDataEntryValue | null;
}

export interface Profile {
    name: string;
}

export interface User {
    user_id: string;
}