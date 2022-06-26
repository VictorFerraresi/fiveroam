import * as alt from "alt-server";

import { onPlayerConnect } from "./player.events";

// Server to Server event handlers
alt.on("playerConnect", onPlayerConnect);

import "./player.events";
import "./chat.events";
