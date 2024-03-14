import Image from "next/image";
import Link from "next/link";
import { fetchPetDetails } from "../pets.loader";

export default async function Page({ params }: { params: { petId: string } }) {
  const petDetails = await fetchPetDetails(params.petId);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={petDetails[0].photos[0]}
            alt="Banner Image"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>

        <div className="mt-8 text-white space-y-4">
          <div className="flex space-x-0 justify-between">
            <h1 className="text-4xl font-bold">{petDetails[0].name}</h1>
            <Link href="/login">
              <button className="rounded font-extrabold bg-green-600 p-4">
                {`Make ${petDetails[0].name} Your Family`}
                <span className="">&#x1f43e;</span>
              </button>
            </Link>
          </div>
          <p className="text-xl">
            <span className="font-semibold">Age:</span> {petDetails[0].age}
          </p>
          <p className="text-xl">
            <span className="font-semibold">Type:</span> {petDetails[0].type}
          </p>
          <p className="text-xl">
            <span className="font-semibold">Breed:</span> {petDetails[0].breed}
          </p>
          <p className="text-xl">
            <span className="font-semibold">Status:</span>{" "}
            {petDetails[0].status}
          </p>
          <p className="text-xl">
            <span className="font-semibold">Added on:</span>{" "}
            {petDetails[0].created_at}
          </p>

          <div className="mt-6">
            <h2 className="text-3xl font-bold mb-4">Description</h2>
            <p className="text-lg leading-relaxed">
              {petDetails[0].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
