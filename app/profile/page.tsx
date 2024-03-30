import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";

interface OptionCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  href: string;
}

const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  icon,
  href,
}) => (
  <Link href={href}>
    <div className="flex flex-col items-center p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer border">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  </Link>
);

export default async function Profile() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">
            Welcome, {data.user?.email}! 👋
          </h2>
          <p className="text-center mb-12">How would you like to proceed?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <OptionCard
              title="Provide a Pet"
              description="Have a pet that needs a new home? Start here."
              icon={<svg>...</svg>}
              href="/pets/addPet"
            />
            <OptionCard
              title="Adopt a Pet"
              description="Looking to adopt a pet? Let's find your new friend."
              icon={<svg>...</svg>}
              href="/pets"
            />
            <OptionCard
              title="My Pets"
              description="View and manage your pet listings."
              icon={<svg>...</svg>}
              href="/myPets"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
