import * as alt from "alt-client";
import { onPlayerShowHud } from "./events/player/onPlayerShowHud";
import { onPlayerSpawn } from "./events/player/onPlayerSpawn";

alt.log("Client script has started.");

alt.onServer("player:ShowHud", onPlayerShowHud);
alt.onServer("player:Spawn", onPlayerSpawn);
