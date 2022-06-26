import {
  getPlayerByUsername,
  PlayerModel,
  updateCharacter,
  updatePlayer,
} from "../repositories/player.repository";
import bcrypt from "bcryptjs";
import { Character } from "../entities/character.entity";
import { Player } from "../entities/player.entity";

export const login = async (
  user: string,
  password: string
): Promise<PlayerModel> => {
  const res = await getPlayerByUsername(user);

  if (!!res) {
    const correctPassword = await bcrypt.compare("" + password, res.password);
    if (correctPassword) {
      return res;
    }
  }

  return null;
};

export const saveCharacter = async (character: Character) => {
  updateCharacter(character);
};

export const savePlayer = async (player: Player) => {
  updatePlayer(player);
};
