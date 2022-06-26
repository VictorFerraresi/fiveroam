import * as alt from "alt-server";
import { onPlayerConnect } from "./player.events";
alt.on("playerConnect", onPlayerConnect);
import "./player.events";
import "./chat.events";
