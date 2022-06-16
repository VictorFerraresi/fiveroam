import * as alt from "alt-client";
import { onPlayerShowHud } from "./events/player/onPlayerShowHud";
alt.log("Client script has started.");
alt.onServer("player:ShowHud", onPlayerShowHud);
