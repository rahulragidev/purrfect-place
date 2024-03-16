import Image from "next/image";
import Link from "next/link";
import { fetchPetDetails } from "../pets.loader";
import PetImageCarousel from "@/components/PetImageCarousel.client";

interface PageParams {
  params: {
    petId: string;
  };
}

export default async function Page({ params }: PageParams) {
  const petDetails = await fetchPetDetails(params.petId);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
        <PetImageCarousel photos={petDetails[0].photos} />
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold">{petDetails[0].name}</h1>
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Adopt {petDetails[0].name} <span className="ml-2">&#x1f43e;</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <p className="col-span-1">
              <span className="font-semibold">Age:</span> {petDetails[0].age}{" "}
              years
            </p>
            <p className="col-span-1">
              <span className="font-semibold">Type:</span> {petDetails[0].type}
            </p>
            <p className="col-span-1">
              <span className="font-semibold">Breed:</span>{" "}
              {petDetails[0].breed}
            </p>
            <p className="col-span-1">
              <span className="font-semibold">Status:</span>{" "}
              {petDetails[0].status}
            </p>
            <p className="col-span-2">
              <span className="font-semibold">Added on:</span>{" "}
              {new Date(petDetails[0].created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-2">Description</h2>
            <p className="text-md">{petDetails[0].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
