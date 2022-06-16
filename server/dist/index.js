import * as alt from "alt-server";
import { onChatInput } from "./events/chat/onChatInput";
import { onPlayerConnect } from "./events/player/onPlayerConnect";
import { onSetPlayerPosition } from "./events/player/onSetPlayerPosition";
alt.log(`Server script has started.`);
alt.on("playerConnect", onPlayerConnect);
alt.onClient("chat:onInput", onChatInput);
alt.onClient("player:SetPosition", onSetPlayerPosition);
import "./commands/index";
