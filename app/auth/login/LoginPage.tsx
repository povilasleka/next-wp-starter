"use client"

import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {login} from "@/lib/auth";
import {Container, Section} from "@/components/craft";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const {toast} = useToast();

    const handleLogin = async (form: FormData) => {
        const username = form.get('username')?.toString() ?? '';
        const password = form.get('password')?.toString() ?? '';

        const response = await login(username, password);
        if (response.success) {
            router.push('/');
            toast({
                description: 'You have successfully logged in',
            });
        } else {
            router.push('/auth/login');
            toast({
                variant: "destructive",
                description: 'Invalid username or password',
            });
        }
    }

    return (
        <Section>
            <Container>
                <h1 className="text-4xl font-semibold mb-6">Login</h1>
                <div className="grid grid-cols-2 gap-x-4">
                    <div className="col-span-2 md:col-span-1">
                        <form action={handleLogin} className="flex flex-col max-w-xl gap-y-4">
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" name="username"/>
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" name="password"/>
                            </div>
                            <Button type="submit">Login to your account</Button>

                            <div className="flex gap-1 mx-auto text-sm">
                                <p>Dont have an account?</p>
                                <Link href="/auth/register" className="hover:underline text-blue-600">Create a new
                                    account.</Link>
                            </div>
                        </form>
                    </div>
                    <div className="col-span-2 md:col-span-1"></div>
                </div>
            </Container>
        </Section>
    )
}