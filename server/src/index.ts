import * as alt from "alt-server";
import { Player } from "./entities/player.entity";

alt.log(`Server script has started.`);

// Prototype overwriting
alt.Player.prototype = new Player();

// Here, we import all the external modules that needs to be executed right after server bootstrap
// Command and event registering, e.g.
import "./commands/index";
import "./events/index";
