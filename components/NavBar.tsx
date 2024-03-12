import React from "react";
import Link from "next/link";
import AuthButton from "./AuthButton"; // Adjust the import path as needed

interface NavbarProps {
  isSupabaseConnected: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isSupabaseConnected }) => {
  return (
    <nav className="w-full flex justify-center bg-black border-b border-gray-200 shadow-sm h-20 sticky top-0 z-50">
      <div className="w-full max-w-6xl flex justify-between items-center px-6 lg:px-8 text-sm">
        <Link
          href="/"
          passHref
          className="font-bold text-3xl text-cyan-500 hover:text-cyan-600 transition-colors duration-200 ease-in-out"
        >
          PawMingle<span>&#x1f43e;</span>
        </Link>
        {isSupabaseConnected && <AuthButton />}
      </div>
    </nav>
  );
};

export default Navbar;
