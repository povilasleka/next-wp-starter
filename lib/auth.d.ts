export interface LoginResponse {
    success: boolean;
    errors: string[];
}

export interface TokenResponse {
    token: string;
    user_email: string;
    user_nicename: string;
    user_display_name: string;
}