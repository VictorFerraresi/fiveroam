import { setTimeout } from "alt-shared";
import { showCompleteHud } from "../../cef/Cef";
export const onPlayerShowHud = (show) => {
    setTimeout(() => {
        showCompleteHud(show);
    }, 1000);
};
