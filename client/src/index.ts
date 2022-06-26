import * as alt from "alt-client";
import {
  onCharSelection,
  onFinishCharSelection,
} from "./events/player/char-selection.events";
import { onPlayerDisplayLogin } from "./events/player/login.events";
import { onPlayerLog } from "./events/player/logging.events";
import { onPlayerShowHud } from "./events/player/hud.events";
import { onPlayerSpawn } from "./events/player/spawn.events";

alt.log("Client script has started.");

alt.onServer("player:ShowHud", onPlayerShowHud);
alt.onServer("player:Spawn", onPlayerSpawn);
alt.onServer("player:Log", onPlayerLog);
alt.onServer("player:DisplayLogin", onPlayerDisplayLogin);
alt.onServer("player:CharSelection", onCharSelection);
alt.onServer("player:FinishCharSelection", onFinishCharSelection);

import "./hotkeys/player.hotkeys";
