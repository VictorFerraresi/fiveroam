import * as alt from "alt-client";
import { onPlayerTest } from "./events/player/onPlayerTest";
alt.log("Client script has started.");
alt.onServer("player:Test", onPlayerTest);
