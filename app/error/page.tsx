import React from "react";
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 md:text-6xl">Oops!</h1>
        <p className="mt-3 text-lg text-gray-600">Something went wrong.</p>
        <div className="mt-6"></div>
      </div>
    </div>
  );
};

export default ErrorPage;
