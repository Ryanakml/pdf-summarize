"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  return (
    <>
      {!isAuthPage && <Header />}
      <main
        className={
          isAuthPage
            ? "min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50"
            : ""
        }
      >
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}