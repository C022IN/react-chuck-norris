import { atom } from "recoil";
import { Cat } from "../model/Cat";

export const favoriteCatsState = atom<Cat[]>({
  key: "favoriteCatsState",
  default: [],
});
