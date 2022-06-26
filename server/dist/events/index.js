import * as alt from "alt-server";
import { onPlayerConnect, onPlayerDisconnect } from "./player.events";
alt.on("playerConnect", onPlayerConnect);
alt.on("playerDisconnect", onPlayerDisconnect);
import "./player.events";
import "./chat.events";
