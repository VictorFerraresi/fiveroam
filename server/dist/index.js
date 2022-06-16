import * as alt from "alt-server";
import { onChatInput } from "./events/chat/onChatInput";
import { onPlayerConnect } from "./events/player/onPlayerConnect";
alt.log(`Server script has started.`);
alt.on("playerConnect", onPlayerConnect);
alt.onClient("chat:onInput", onChatInput);
import "./commands/index";
