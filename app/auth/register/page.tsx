import RegisterPage from "@/app/auth/register/RegisterPage";
import {isAuthenticated} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function Page() {
    if (await isAuthenticated() || process.env.ENABLE_USER_AUTH !== 'true') {
        redirect('/');
    }

    return (
        <RegisterPage />
    );
}