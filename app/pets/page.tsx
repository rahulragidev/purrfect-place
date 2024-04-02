import React from "react";
import { fetchAllPetsData } from "@/utils/pets/fetchAllPetsData";
import PetsFilter from "./PetsFilter";

const Index = async () => {
  const pets = await fetchAllPetsData();
  return <PetsFilter pets={pets} />;
};

export default Index;
