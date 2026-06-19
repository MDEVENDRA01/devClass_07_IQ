import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Faculty Coach",
  description: "Elevate Every Lesson with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppProvider>
            {children}
            
            {/* Global Toasts Container */}
            <div id="toast-root"></div>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
