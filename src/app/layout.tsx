import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'IntelliQ',
    template: '%s | IntelliQ',
  },
  description: 'Test your expertise across various subjects with IntelliQ',
  openGraph: {
    title: 'IntelliQ',
    description: 'Test your expertise across various subjects with IntelliQ',
    url: 'www.intelliq.arc-solutions.xyz/',
    siteName: 'IntelliQ',
    locale: 'en-US',
    type: 'website',
  },
};
import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import { AuthProvider } from "@/contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700", "800"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    <html lang="en">
      <body className={cn(inter.className, "antialiased min-h-screen pt-32")}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
        <ToastContainer position="top-right" autoClose={2000} />
      </body>
    </html>
  );
}
