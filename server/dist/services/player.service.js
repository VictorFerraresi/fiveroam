import { getPlayerByUsername, updateCharacter, updatePlayer, } from "../repositories/player.repository";
import bcrypt from "bcryptjs";
export const login = async (user, password) => {
    const res = await getPlayerByUsername(user);
    if (!!res) {
        const correctPassword = await bcrypt.compare("" + password, res.password);
        if (correctPassword) {
            return res;
        }
    }
    return null;
};
export const saveCharacter = async (character) => {
    updateCharacter(character);
};
export const savePlayer = async (player) => {
    updatePlayer(player);
};
