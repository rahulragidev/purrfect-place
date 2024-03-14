import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
import PetCard from "@/components/PetCard";

const IndexPage = async () => {
  async function getPets() {
    const { data, error } = await supabase.from("pets").select("*");

    if (error) {
      console.error("Error fetching pets:", error.message);
      throw new Error("Failed to fetch pets");
    }
    console.log(data);
    return data;
  }
  const pets = await getPets();

  return (
    <div>
      <header className="hero text-white p-12 text-center">
        <h1 className="text-4xl font-bold">Find Your Perfect Pet Companion</h1>
        <p className="mt-3 max-w-2xl mx-auto">
          Join our community dedicated to connecting pets in need with loving
          families. Discover how you can make a difference today.
        </p>
      </header>

      <section className="mission py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p>
            We believe every pet deserves a loving home. Our mission is to
            streamline the adoption process, making it easier for you to find
            your new best friend.
          </p>
        </div>
      </section>

      <section className="how-it-works py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
          <ul className="space-y-4">
            <li>1. Browse available pets / Provide pets for adoption</li>
            <li>2. Learn about each pet's story, needs, and personality.</li>
            <li>
              3. Apply to adopt and connect with the pet's current caretaker.
            </li>
          </ul>
        </div>
      </section>

      <section className="featured-pets py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Featured Pets</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pets.map((pet) => (
              <Link href={`/pets/${pet.pet_id}`} key={pet.id}>
                <PetCard pet={pet} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
