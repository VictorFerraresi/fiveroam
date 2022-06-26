import * as alt from "alt-server";
import { onPlayerConnect, onPlayerDisconect } from "./player.events";
alt.on("playerConnect", onPlayerConnect);
alt.on("playerDisconnect", onPlayerDisconect);
import "./player.events";
import "./chat.events";
