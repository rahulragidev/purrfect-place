"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaDog, FaCat, FaBug } from "react-icons/fa";

const ErrorPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <FaDog className="text-6xl animate-bounce" />
            <FaCat className="text-6xl  animate-bounce ml-8" />

            <div className="absolute top-0 right-0 -mt-5 -mr-10">
              <FaBug className="text-4xl  animate-spin ml-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold  mb-2">
            Uh-oh! Our furry detectives have encountered a mischievous bug!
          </h1>
          <p className=" text-lg">
            They're chasing it around the server room, but don't worry, they'll
            catch it soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full ">
      <div className="text-center">
        <h1 className="text-4xl font-bold  md:text-6xl">
          Pawsitively Stumped!
        </h1>
        <p className="mt-3 text-lg ">
          Our apologies, but it seems our furry friends have chased the bug into
          a rabbit hole.
        </p>
        <div className="mt-6">
          <p className="">
            Don't worry, we've sent our elite team of puppy programmers and
            kitten coders to investigate.
          </p>
          <p className="">
            In the meantime, why not play a game of fetch with your favorite
            pet?
          </p>
        </div>
      </div>
      <div className="mt-8">
        <Link href="/">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition duration-300">
            Take Me Back to the Furry Fun!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
