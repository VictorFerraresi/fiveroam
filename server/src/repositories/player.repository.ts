import { db } from "../database";
import { Character } from "../entities/character.entity";
import { Player } from "../entities/player.entity";

export const getPlayerByUsername = async (
  username: string
): Promise<PlayerModel | null> => {
  const res = await db.query("SELECT * FROM player WHERE username = $1", [
    username,
  ]);
  if (!!res && res.rowCount > 0) {
    return {
      id: res.rows[0].id,
      username: res.rows[0].username,
      password: res.rows[0].password,
      admin: res.rows[0].admin,
    };
  }

  return null;
};

export const updateCharacter = async (character: Character) => {
  db.query(
    "UPDATE character SET playerid = $1, name = $2, team = $3, money = $4",
    [character.player.uid, character.name, character.team, character.money]
  );
};

export const updatePlayer = async (player: Player) => {
  db.query("UPDATE player SET username = $1, password = $2, admin = $3", [
    player.user,
    player.encryptedPassword,
    player.admin,
  ]);
};

// Models
export interface PlayerModel {
  id: number;
  username: string;
  password: string;
  admin: number;
}
