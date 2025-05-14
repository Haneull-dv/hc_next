"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "재무공시", href: "/finance" },
  { name: "ESG공시", href: "/esg" },
];

export default function TopTabs() {
  const pathname = usePathname();
  return (
    <nav className="w-full flex justify-center border-b border-gray-700 bg-[#101828] z-50 sticky top-0">
      <div className="flex">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`px-8 py-4 text-lg font-semibold transition-colors duration-200 border-b-4 ${isActive ? "border-blue-500 text-blue-400" : "border-transparent text-gray-400 hover:text-blue-300"}`}
              prefetch={false}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 