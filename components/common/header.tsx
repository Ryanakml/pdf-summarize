import { Button } from "@/components/ui/button"
import Link from "next/link";
import NavLink from "@/components/common/nav-link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
 
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
        <SignedIn>
          <NavLink href="/dashboard">Your Summary</NavLink>
        </SignedIn>
      </div>

      <div className="flex lg:flex-1 lg:justify-end">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href="/upload">Upload PDF</NavLink>
            <div>Pro</div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <span className="cursor-pointer text-sm text-gray-900 hover:text-purple-500">
              Sign In
            </span>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}