import { ReactNode } from "react";

interface PetDetailsLayoutProps {
  children: ReactNode;
}

interface NavbarProps {
  isSupabaseConnected: boolean;
}

const PetDetailsLayout = ({ children }: PetDetailsLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <main className="flex-grow container mx-auto px-2 sm:px-4 lg:px-6 py-6">
        {children}
      </main>
    </div>
  );
};

export default PetDetailsLayout;
