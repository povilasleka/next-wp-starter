import {Metadata} from "next";
import LoginPage from "@/app/auth/login/LoginPage";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";


export const metadata: Metadata = {
    title: "Login",
    description: "User login page",
    alternates: {
        canonical: "/auth/login",
    },
};

export default async function Page() {
    if ((await cookies()).get('jwt_auth')) {
        redirect('/');
    }

    return <LoginPage />;
}