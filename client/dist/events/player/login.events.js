import { emit, setTimeout } from "alt-client";
import { showCompleteHud } from "../../cef/Cef";
export const onPlayerDisplayLogin = () => {
    setTimeout(() => {
        showCompleteHud(true);
        emit("chat:showMessage", `Digite /login [usuário] [senha]`, "grey", [195, 195, 195], "unlock");
    }, 1000);
};
