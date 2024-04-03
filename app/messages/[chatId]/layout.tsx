import { ReactNode } from "react";
import React from "react";

interface ChatLayoutProps {
  children: ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <main className="flex-grow container mx-auto sm:px-12 lg:px-48 py-6">
        {children}
      </main>
    </div>
  );
};

export default ChatLayout;
