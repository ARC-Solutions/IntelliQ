import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/ui/Navbar";
import { AuthProvider } from "@/contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700", "800"],
});

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
    images: [
      {
        url: 'https://www.intelliq.arc-solutions.xyz/intelliq_og.png',
        width: 1920,
        height: 1080,
      }
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    title: 'IntelliQ',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.png',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
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
