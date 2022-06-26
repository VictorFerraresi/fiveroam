import { db } from "../database";
import bcrypt from "bcryptjs";
export const getPlayerByUserAndPassword = async (user, password) => {
    const res = await db.query("SELECT * FROM player WHERE username = $1", [
        user,
    ]);
    if (!!res && res.rowCount > 0) {
        const correctPassword = await bcrypt.compare("" + password, res.rows[0].password);
        if (correctPassword) {
            return res.rows[0];
        }
    }
    return null;
};
