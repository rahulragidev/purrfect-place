import React from "react";
import Link from "next/link"; // Import Link from Next.js

// Logo component for Pawmingle
const Logo = () => (
  <div className="flex items-center">
    <span className=" hover:shadow-xl font-black text-2xl transition-colors duration-150 ease-in-out">
      PawMingle 🐾
    </span>
  </div>
);

// NavbarLink interface tailored for Next.js usage
interface NavbarLink {
  href: string;
  label: string;
  iconName?: React.ReactNode;
  className?: string;
}

interface NavbarProps {
  links?: NavbarLink[];
  children?: React.ReactNode;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ links, children, className }) => {
  return (
    <nav
      className={`w-full bg-black border-b border-gray-200 shadow-lg sticky top-0 z-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        <Link href="/" passHref className="flex items-center justify-center">
          <Logo />
        </Link>
        <div className="flex-1 flex items-center justify-center space-x-4 md:space-x-8">
          {links?.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              passHref
              className={`text-gray-300 hover:text-white transition-colors duration-150 ease-in-out ${link.className}`}
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
