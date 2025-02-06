"use server"

import {
    Token,
    AuthResponse
} from "./auth.d";
import { cookies } from "next/headers";
import querystring from "query-string";
import {redirect} from "next/navigation";
import {createUser} from "@/lib/wordpress";

const baseUrl = process.env.WORDPRESS_URL;
if (!baseUrl) {
    throw new Error("WORDPRESS_URL environment variable is not defined");
}

function getUrl(path: string, query?: Record<string, any>) {
    const params = query ? querystring.stringify(query) : null;
    return `${baseUrl}${path}${params ? `?${params}` : ""}`;
}

const getJwtToken = async (username: string, password: string): Promise<Token> => {
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

const createSessionCookie = async (token: Token): Promise<void> => {
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
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
    try {
        const token = await getJwtToken(username, password);
        await createSessionCookie(token);
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

export const register = async (username: string, password: string, email: string): Promise<AuthResponse> => {
    try {
        await createUser({
            username,
            password,
            email,
        });
        const token = await getJwtToken(username, password);
        await createSessionCookie(token);
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                errors: [error.message],
            }
        }
        throw error;
    }

    return {
        success: true,
        errors: [],
    }
}

export const logout = async (): Promise<never> => {
    const cookieStore = await cookies();

    if (cookieStore.get('jwt_auth')) {
        cookieStore.delete('jwt_auth');
    }

    redirect('/auth/login');
}

export const isAuthenticated = async (): Promise<boolean> => {
    return Boolean((await cookies()).get('jwt_auth'))
}