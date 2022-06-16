import * as alt from "alt-client";
import { onPlayerLog } from "./events/player/onPlayerLog";
import { onPlayerShowHud } from "./events/player/onPlayerShowHud";
import { onPlayerSpawn } from "./events/player/onPlayerSpawn";
alt.log("Client script has started.");
alt.onServer("player:ShowHud", onPlayerShowHud);
alt.onServer("player:Spawn", onPlayerSpawn);
alt.onServer("player:Log", onPlayerLog);
import "./hotkeys/Player.hotkeys";
