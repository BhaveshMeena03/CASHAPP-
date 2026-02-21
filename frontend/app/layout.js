import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata = {
    title: "FlowCash",
    description: "Spend, save, and invest with FlowCash.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased overflow-x-hidden">
                <AuthProvider>
                    <ThemeProvider>
                        <div className="flex flex-col min-h-screen bg-white dark:bg-black p-6 transition-colors duration-300 mx-auto relative border-x border-gray-100 dark:border-zinc-800 shadow-xl">
                            {children}
                        </div>
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
