import * as alt from "alt-server";
import { onChatInput } from "./events/chat/onChatInput";
import { onPlayerConnect } from "./events/player/onPlayerConnect";
import { onSetPlayerPosition } from "./events/player/onSetPlayerPosition";
import { onSelectedCharacter } from "./events/player/onSelectedCharacter";
import { Player } from "./entities/Player";

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
