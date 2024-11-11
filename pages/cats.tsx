// react-chuck-norris/pages/cats.tsx
import React from "react";
import RandomCat from "../src/RandomCatPic/components/RandomCat";

const CatsPage: React.FC = () => {
  return (
    <RandomCat showAppBar={true} showFavoritesButton={true} />
  );
};

export default CatsPage;
