import * as alt from "alt-server";
import { Vector3 } from "alt-shared";
import { Player } from "../../entities/Player";

const copSpawn = new Vector3(
  451.75384521484375,
  -979.8461303710938,
  30.6783447265625
);

const robberSpawn = new Vector3(
  116.42637634277344,
  -1949.7098388671875,
  20.7200927734375
);

export const onSelectedCharacter = (player: Player, team: number) => {
  player.team = team;

  if (0 == team) {
    player.spawn(copSpawn);
    player.model = "s_m_y_cop_01";
    player.giveWeapon(alt.hash("weapon_pistol_mk2"), 100, false);
    player.giveWeapon(alt.hash("weapon_nightstick"), 1, true);
    player.giveWeapon(alt.hash("weapon_flashlight"), 1, false);
    player.giveWeapon(alt.hash("weapon_pumpshotgun"), 50, false);
    player.giveWeapon(alt.hash("weapon_carbinerifle"), 200, false);
  } else {
    player.spawn(robberSpawn);
    player.model = "g_m_y_ballasout_01";
    player.giveWeapon(alt.hash("weapon_pistol_mk2"), 100, false);
    player.giveWeapon(alt.hash("weapon_knife"), 1, true);
    player.giveWeapon(alt.hash("weapon_dbshotgun"), 50, false);
    player.giveWeapon(alt.hash("weapon_assaultrifle"), 200, false);
  }

  alt.setTimeout(() => {
    player.emit("player:ShowHud", true);
    player.emit("player:Spawn");
    player.emit("player:FinishCharSelection");
  }, 500);
};
