import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/submit-button";
import React from "react";

export default function AddPet({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const addPet = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const age = parseInt(formData.get("age") as string);
    const breed = formData.get("breed") as string;
    const description = formData.get("description") as string;
    const photosFiles = formData.getAll("photos") as File[];
    const status = formData.get("status") as string;
    const additionalInfo = JSON.stringify({
      specialNeeds: formData.get("additional_info"),
    });

    const supabase = createClient();
    const { data: user, error: userError } = await supabase.auth.getUser();
    const providerUserId = user.user?.id;

    if (userError) {
      console.log(userError);
      return redirect("/error");
    }

    const photoUrls: string[] = [];

    for (const file of photosFiles) {
      const { data, error: uploadError } = await supabase.storage
        .from("pets")
        .upload(`${name}-${new Date().getTime()}-${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.log(uploadError);
        return redirect("/error");
      }

      const { data: publicUrlData } = supabase.storage
        .from("pets")
        .getPublicUrl(data.path);
      const publicUrl = publicUrlData?.publicUrl;

      if (publicUrl) {
        photoUrls.push(publicUrl);
      }
    }

    const { error: insertError } = await supabase.from("pets").insert([
      {
        name,
        type,
        age,
        breed,
        description,
        provider_user_id: providerUserId,
        photos: photoUrls,
        status,
        additional_info: additionalInfo,
      },
    ]);

    if (insertError) {
      console.log(insertError);
      return redirect("/error");
    }

    return redirect("/pets");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Add a Pet
          </h2>
          <p className="mt-2 text-center text-sm">
            Fill in the details below to add a pet for adoption.
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-100 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-black"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="type" className="sr-only">
                Type
              </label>
              <input
                id="type"
                name="type"
                type="text"
                autoComplete="type"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-black"
                placeholder="Type"
              />
            </div>
            <div>
              <label htmlFor="age" className="sr-only">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                autoComplete="age"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-black"
                placeholder="Age"
              />
            </div>
            <div>
              <label htmlFor="breed" className="sr-only">
                Breed
              </label>
              <input
                id="breed"
                name="breed"
                type="text"
                autoComplete="breed"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-black"
                placeholder="Breed"
              />
            </div>
            <div>
              <label htmlFor="description" className="sr-only">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-black"
                placeholder="Description"
              ></textarea>
            </div>
            <div>
              <label htmlFor="photos" className="sr-only">
                Photos
              </label>
              <input
                id="photos"
                name="photos"
                type="file"
                multiple
                accept="image/*"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-black"
              />
            </div>
            <div>
              <label htmlFor="status" className="sr-only">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-black"
              >
                <option value="">Select Status</option>
                <option value="available">Available</option>
                <option value="adopted">Adopted</option>
              </select>
            </div>
            <div>
              <label htmlFor="additional_info" className="sr-only">
                Additional Info
              </label>
              <input
                id="additional_info"
                name="additional_info"
                type="text"
                autoComplete="additional-info"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-100 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-black"
                placeholder="Additional Info"
              />
            </div>
          </div>

          <div>
            <SubmitButton
              formAction={addPet}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Pet
            </SubmitButton>
          </div>
        </form>
        {searchParams?.message && (
          <p className="mt-2 text-center text-sm text-red-600">
            {searchParams.message}
          </p>
        )}
      </div>
    </div>
  );
}
