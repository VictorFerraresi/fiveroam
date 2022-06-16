import * as alt from "alt-server";
import { onChatInput } from "./events/onChatInput";
import { onPlayerConnect } from "./events/onPlayerConnect";

alt.log(`Server script has started.`);

alt.on("playerConnect", onPlayerConnect);
alt.onClient("chat:onInput", onChatInput);

import "./commands/index";
