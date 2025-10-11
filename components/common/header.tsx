import { Button } from "@/components/ui/button"
import Link from "next/link";
import NavLink from "@/components/common/nav-link";
 
export default function Header() {
  const isLoggedIn = false;

  return (
    <nav className="flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1 ">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <span className="font-extrabold lg:text-lg text-gray-900 hover:text-purple-500">
            AI  Summarizer
          </span>
        </NavLink>
      </div>

      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        {isLoggedIn && <NavLink href="/#dashboard">Your Summary</NavLink>}
      </div>

      <div className="flex lg:flex-1 lg:justify-end">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <NavLink href="/#upload">Upload PDF</NavLink>
            <div>Pro</div>
            <Button>User</Button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link href="/#sign-in" className="text-sm text-gray-900 hover:text-purple-500">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}