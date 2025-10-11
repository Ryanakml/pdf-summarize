'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function NavLink({
  href,
  children,
  className = "",
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors duration-200 hover:text-purple-500 text-gray-900",
        className,
        isActive && "text-purple-500"
      )}
    >
      {children}
    </Link>
  );
}