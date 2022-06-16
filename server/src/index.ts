import * as alt from "alt-server";
import { onChatInput } from "./events/chat/onChatInput";
import { onPlayerConnect } from "./events/player/onPlayerConnect";
import { onSetPlayerPosition } from "./events/player/onSetPlayerPosition";
import { onSelectedCharacter } from "./events/player/onSelectedCharacter";

alt.log(`Server script has started.`);

alt.on("playerConnect", onPlayerConnect);
alt.onClient("chat:onInput", onChatInput);
alt.onClient("player:SetPosition", onSetPlayerPosition);
alt.onClient("player:SelectedCharacter", onSelectedCharacter);

import "./commands/index";
