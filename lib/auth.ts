"use server"

import {
    TokenResponse,
    LoginResponse
} from "./auth.d";
import { cookies } from "next/headers";
import querystring from "query-string";
import {redirect} from "next/navigation";

const baseUrl = process.env.WORDPRESS_URL;
if (!baseUrl) {
    throw new Error("WORDPRESS_URL environment variable is not defined");
}

function getUrl(path: string, query?: Record<string, any>) {
    const params = query ? querystring.stringify(query) : null;
    return `${baseUrl}${path}${params ? `?${params}` : ""}`;
}

export const getJwtToken = async (username: string, password: string): Promise<TokenResponse> => {
    const url = getUrl('/wp-json/jwt-auth/v1/token');
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    if (!response.ok) {
        throw new Error('Failed to login');
    }

    return response.json();
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const token = await getJwtToken(username, password);
        const cookieStore = await cookies();

        const userData = {
            email: token.user_email,
            niceName: token.user_nicename,
            displayName: token.user_display_name,
            token: token.token,
        };

        cookieStore.set('jwt_auth', JSON.stringify(userData), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });
    } catch (error) {
        return {
            success: false,
            errors: ['Invalid username or password'],
        }
    }

    return {
        success: true,
        errors: [],
    }
}

export const logout = async () => {
    const cookieStore = await cookies();

    if (cookieStore.get('jwt_auth')) {
        cookieStore.delete('jwt_auth');
    }

    redirect('/auth/login');
}