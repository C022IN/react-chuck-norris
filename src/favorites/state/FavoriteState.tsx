import { atom } from "recoil";

// Define the joke type to accept both string and custom joke objects
export type FavoriteJoke = string | { text: string; isCustom: boolean };

// Update the atom to use the new type
export const favoritesState = atom<FavoriteJoke[]>({
  key: "favoritesState",
  default: [],
});