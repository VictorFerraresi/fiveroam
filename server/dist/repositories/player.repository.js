import { db } from "../database";
export const getPlayerByUsername = async (username) => {
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
export const updateCharacter = async (character) => {
    db.query("UPDATE character SET playerid = $1, name = $2, team = $3, money = $4", [character.player.uid, character.name, character.team, character.money]);
};
export const updatePlayer = async (player) => {
    db.query("UPDATE player SET username = $1, password = $2, admin = $3", [
        player.user,
        player.encryptedPassword,
        player.admin,
    ]);
};
