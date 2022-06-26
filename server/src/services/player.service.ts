import { db } from "../database";
import { PlayerModel } from "../repositories/player.repository";
import bcrypt from "bcryptjs";

export const getPlayerByUserAndPassword = async (
  user: string,
  password: string
): Promise<PlayerModel> => {
  const res = await db.query("SELECT * FROM player WHERE username = $1", [
    user,
  ]);

  if (!!res && res.rowCount > 0) {
    const correctPassword = await bcrypt.compare(
      "" + password,
      res.rows[0].password
    );
    if (correctPassword) {
      return res.rows[0];
    }
  }

  return null;
};
