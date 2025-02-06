import {Metadata} from "next";
import LoginPage from "@/app/auth/login/LoginPage";
import {redirect} from "next/navigation";
import {isAuthenticated} from "@/lib/auth";

export const metadata: Metadata = {
    title: "Login",
    description: "User login page",
    alternates: {
        canonical: "/auth/login",
    },
};

export default async function Page() {
    if (await isAuthenticated() || process.env.ENABLE_USER_AUTH !== 'true') {
        redirect('/');
    }

    return <LoginPage />;
}