import React from "react";
import Link from "next/link";
import { FaPaw } from "react-icons/fa";

const MyPets = () => {
  return (
    <Link href="/myPets">
      <button
        className="flex items-center justify-center rounded-full p-2 transition-colors duration-300 ease-in-out hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Pets"
      >
        <FaPaw className="text-2xl transition-transform duration-300 ease-in-out group-hover:rotate-[-30deg] group-hover:scale-110" />
      </button>
    </Link>
  );
};

export default MyPets;
