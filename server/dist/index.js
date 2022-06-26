import * as alt from "alt-server";
import { Player } from "./entities/player.entity";
alt.log(`Server script has started.`);
alt.Player.prototype = new Player();
import "./commands/index";
import "./events/index";
