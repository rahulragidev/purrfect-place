import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";

interface OptionCardProps {
  title: string;
  description: string;
  icon: JSX.Element; // React Icon
}

const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  icon,
}) => (
  <div className="flex flex-col items-center shadow-lg rounded-3xl p-6 cursor-pointer hover:scale-105 transform transition duration-200 ease-out w-full h-96 border border-gray-700 hover:shadow-gray-400">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="font-bold text-xl mb-2">{title}</h3>
    <p className="text-base text-center">{description}</p>
  </div>
);

export default async function Profile() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10">
          How would you like to proceed? <br />
          {data.user?.email}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Link href="/pets/addPet">
            <OptionCard
              title="Provide a Pet"
              description="Have a pet that needs a new home? Start here."
              icon={<svg>...</svg>}
            />
          </Link>
          <Link href="/pets">
            <OptionCard
              title="Adopt a Pet"
              description="Looking to adopt a pet? Let's find your new friend."
              icon={<svg>...</svg>}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
