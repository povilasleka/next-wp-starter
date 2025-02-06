export interface AuthResponse {
    success: boolean;
    errors: string[];
}

export interface Token {
    token: string;
    user_email: string;
    user_nicename: string;
    user_display_name: string;
}