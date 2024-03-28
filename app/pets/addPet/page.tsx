import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/submit-button";
import React from "react";

export default function addPet({
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
    const additional_info = JSON.stringify({
      specialNeeds: formData.get("additional_info"),
    });

    const supabase = createClient();
    const { data: user, error: userError } = await supabase.auth.getUser();
    const provider_user_id = user.user?.id;
    if (userError) {
      console.log(userError);
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

      const publicUrlObject = supabase.storage
        .from("pets")
        .getPublicUrl(data.path);
      const publicUrl = publicUrlObject.data?.publicUrl;
      if (publicUrl) {
        photoUrls.push(publicUrl);
      }
    }
    console.log(photoUrls);
    const { error } = await supabase.from("pets").insert([
      {
        name,
        type,
        age,
        breed,
        description,
        provider_user_id: provider_user_id,
        photos: photoUrls,
        status,
        additional_info,
      },
    ]);

    if (error) {
      console.log(error);
      return redirect("/error");
    } else {
      return redirect(`/pets`);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Type
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="type"
            name="type"
            type="text"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="age"
          >
            Age
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="age"
            name="age"
            type="number"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="breed"
          >
            Breed
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="breed"
            name="breed"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="photos"
          >
            Photos
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="photos"
            name="photos"
            type="file"
            multiple
            accept="image/*"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="status"
          >
            Status
          </label>
          <select
            className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="status"
            name="status"
          >
            <option value="available">Available</option>
            <option value="adopted">Adopted</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="additional_info"
          >
            Additional Info
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="additional_info"
            name="additional_info"
            type="text"
          />
        </div>
        <SubmitButton
          formAction={addPet}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
        >
          Add Pet
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
