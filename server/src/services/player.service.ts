import { Player } from "../entities/player.entity";

export const getPlayerByUserAndPassword = async (
  user: string,
  password: string
): Promise<Player | null> => {
  // const player = await db.player.findFirst({
  //   where: {
  //     user,
  //     password,
  //   },
  // });

  // if (!!player) {
  //   const res = new Player();

  //   res.uid = player.id;
  //   res.user = player.user;
  //   res.encryptedPassword = player.password;
  //   res.admin = player.admin;

  //   return res;
  // }

  return null;
};
