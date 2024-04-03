import React from "react";
import { FaPaw } from "react-icons/fa";

const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          <FaPaw className="text-6xl  animate-pulse" />
          <div className="absolute top-0 right-0 -mt-2 -mr-2">
            <div className="w-4 h-4 rounded-full animate-ping">.</div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Loading your messages...</h1>
        <p className="text-lg">Fetching the latest conversations for you!</p>
      </div>
    </div>
  );
};

export default LoadingPage;
