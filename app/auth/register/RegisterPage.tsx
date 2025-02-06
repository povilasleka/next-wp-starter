"use client"

import {Container, Section} from "@/components/craft";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {register} from "@/lib/auth";
import {useRouter} from "next/navigation";
import {useToast} from "@/hooks/use-toast";

export default function RegisterPage() {
    const router = useRouter();
    const {toast} = useToast();

    const handleRegister = async (form: FormData) => {
        const username = form.get('username')?.toString() ?? '';
        const password = form.get('password')?.toString() ?? '';
        const repeatPassword = form.get('password_repeat')?.toString() ?? '';
        const email = form.get('email')?.toString() ?? '';

        if (password !== repeatPassword) {
            router.push('/auth/register');
            toast({
                variant: "destructive",
                description: 'Passwords do not match',
            });
            return;
        }

        const response = await register(username, password, email);
        if (response.success) {
            router.push('/');
            toast({
                description: 'You have successfully registered!',
            });
        } else {
            router.push('/auth/register');
            toast({
                variant: "destructive",
                description: response.errors.join(', '),
            });
        }
    }

    return (
        <Section>
            <Container>
                <h1 className="text-4xl font-semibold mb-6">Create a new user</h1>
                <div className="grid grid-cols-2 gap-x-4">
                    <div className="col-span-2 md:col-span-1">
                        <form action={handleRegister} className="flex flex-col max-w-xl gap-y-4">
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" name="username"/>
                            </div>
                            <div>
                                <Label htmlFor="username">Email</Label>
                                <Input type="text" name="email"/>
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" name="password"/>
                            </div>
                            <div>
                                <Label htmlFor="password">Repeat Password</Label>
                                <Input type="password" name="password_repeat"/>
                            </div>
                            <Button type="submit">Create a new user</Button>

                            <div className="flex gap-1 mx-auto text-sm">
                                <p>Already have an account?</p>
                                <Link href="/auth/login" className="hover:underline text-blue-600">Sign in here.</Link>
                            </div>
                        </form>
                    </div>
                    <div className="col-span-2 md:col-span-1"></div>
                </div>
            </Container>
        </Section>
    )
}