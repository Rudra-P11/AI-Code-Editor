import Link from "next/link";
import Image from "next/image";
// import { ThemeToggle } from "@/components/ui/toggle-theme";
import UserButton from "../auth/components/user-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-50">
        <div className="bg-white dark:bg-black w-full border-b border-slate-200 dark:border-slate-800">
          {/* Rest of the header content */}
          <div className="flex items-center justify-center w-full flex-col">
            <div
              className={`
                            flex items-center justify-between
                            w-full
                            px-6 py-4
                            relative
                            transition-all duration-300 ease-in-out
                        `}
            >
              <div className="relative z-10 flex items-center justify-between w-full gap-2">
                {/* Logo Section with Navigation Links */}
                <div className="flex items-center gap-8 justify-center">
                  <Link
                    href="/"
                    className="flex items-center gap-3 justify-center"
                  >
                    <Image
                      src={"/logo.svg"}
                      alt="Logo"
                      height={40}
                      width={40}
                    />

                    <span className="hidden sm:block font-bold text-base text-foreground">
                      VibeCode
                    </span>
                  </Link>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  {/* Desktop Navigation Links */}
                  <div className="hidden sm:flex items-center gap-6">
                    <Link
                      href="/docs/components/background-paths"
                      className="text-sm font-medium text-slate-600 hover:text-foreground dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
                    >
                      Docs
                    </Link>
                    <Link
                      href="https://codesnippetui.pro/templates?utm_source=codesnippetui.com&utm_medium=header"
                      target="_blank"
                      className="text-sm font-medium text-slate-600 hover:text-foreground dark:text-slate-400 dark:hover:text-slate-100 transition-colors flex items-center gap-2"
                    >
                      API
                      <span className="text-green-600 dark:text-green-400 border border-green-300 dark:border-green-600 rounded px-2 py-0.5 text-xs font-semibold bg-green-50 dark:bg-green-950/30">
                        New
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Right side items */}
                <div className="hidden sm:flex items-center gap-4">
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <ThemeToggle />
                  <UserButton />
                </div>

                {/* Mobile Navigation */}
                <div className="flex sm:hidden items-center gap-3">
                  <Link
                    href="/docs/components/action-search-bar"
                    className="text-sm font-medium text-slate-600 hover:text-foreground dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
                  >
                    Docs
                  </Link>
                  <ThemeToggle />
                  <UserButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
