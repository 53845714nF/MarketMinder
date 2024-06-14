export interface Auth {
    name: FormDataEntryValue | null
    password: FormDataEntryValue | null;
}

export interface AuthResponse {
    message: string;
}