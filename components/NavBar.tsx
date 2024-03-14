import React, { ReactNode } from "react";
import Link from "next/link";

interface NavbarLink {
  href: string;
  label: string;
  iconName?: ReactNode;
  className?: string;
}

interface NavbarProps {
  links?: NavbarLink[];
  children?: ReactNode;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ links, children, className }) => {
  return (
    <nav
      className={`w-full flex justify-center bg-black border-b border-gray-200 shadow-lg h-20 sticky top-0 z-50 ${className}`}
    >
      <div className="w-full max-w-6xl flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 md:space-x-8">
          {links?.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              passHref
              className={`flex items-center font-semibold text-lg transition duration-150 ease-in-out transform hover:scale-105 ${link.className}`}
            >
              {link.iconName && <span className="mr-2">{link.iconName}</span>}
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center">{children}</div>
      </div>
    </nav>
  );
};

export default Navbar;
