import { setTimeout } from "alt-shared";
import { showCompleteHud } from "../../cef/Cef";

export const onPlayerShowHud = (show: boolean) => {
  setTimeout(() => {
    showCompleteHud(show);
  }, 1000);
};
