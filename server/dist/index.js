import * as alt from "alt-server";
import { onPlayerConnect } from "./events/onPlayerConnect";
alt.log(`Server script has started.`);
alt.on("playerConnect", onPlayerConnect);
