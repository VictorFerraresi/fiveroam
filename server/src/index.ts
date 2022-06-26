import * as alt from "alt-server";
import { onChatInput } from "./events/chat.events";
import { Player } from "./entities/player.entity";
import {
  onPlayerConnect,
  onSelectedCharacter,
  onSetPlayerPosition,
} from "./events/player.events";

alt.log(`Server script has started.`);

// Server event handlers
alt.on("playerConnect", onPlayerConnect);

// Client event handlers
alt.onClient("chat:onInput", onChatInput);
alt.onClient("player:SetPosition", onSetPlayerPosition);
alt.onClient("player:SelectedCharacter", onSelectedCharacter);

// Prototype overwriting
alt.Player.prototype = new Player();

import "./commands/index";
