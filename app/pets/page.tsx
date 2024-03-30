import React from "react";
import { getPets } from "./pets.loader";
import PetsFilter from "./PetsFilter";

const Index = async () => {
  const pets = await getPets();

  return <PetsFilter pets={pets} />;
};

export default Index;
