"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            await login(email, password);
            router.push("/");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black p-6 transition-colors duration-300">
            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                <div className="flex justify-center mb-8">
                    <img src="/flowcash-logo.png" alt="FlowCash" className="w-24 h-24 rounded-3xl shadow-xl shadow-cashapp/10" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-2 text-center">Welcome back</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-10 text-center">
                    Sign in to your FlowCash account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-cashapp rounded-xl outline-none transition-all"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-transparent focus:border-cashapp rounded-xl outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm font-medium animate-shake">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-cashapp hover:bg-green-600 text-white font-bold py-4 rounded-full flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        <span>{isSubmitting ? "Signing in..." : "Sign In"}</span>
                        {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                    </button>
                </form>

                <p className="text-center mt-8 text-gray-500 text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-cashapp font-bold hover:underline">
                        Register now
                    </Link>
                </p>
            </div>
        </div>
    );
}
