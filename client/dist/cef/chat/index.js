import * as alt from "alt-client";
import { showCursor } from "../Cef";
let chatActive = false;
let inputActive = false;
let scrollActive = false;
let inputBlocked = false;
const webview = new alt.WebView("http://resource/client/cef/chat/html/index.html");
webview.focus();
webview.on("chat:onLoaded", () => {
    activateChat(false);
    push("Conectado ao servidor", "limegreen", [0, 190, 0], "check");
});
webview.on("chat:onInputStateChange", (state, keepPlayerControls) => {
    alt.emitServer("player:SetTyping", state);
    inputActive = state;
    if (!keepPlayerControls) {
        showCursor(state);
        alt.toggleGameControls(!state);
    }
});
webview.on("chat:onChatStateChange", (state) => {
    chatActive = state;
});
webview.on("chat:onInput", (text) => {
    alt.emitServer("chat:onInput", text[0] === "/" ? true : false, text);
});
alt.on("chat:showMessage", (text, color, gradient, icon, roleplay) => {
    push(text, color, gradient, icon, roleplay);
});
alt.onServer("chat:showMessage", (text, color, gradient, icon, roleplay) => {
    push(text, color, gradient, icon, roleplay);
});
alt.onServer("chat:activateChat", (state) => {
    activateChat(state);
});
alt.onServer("chat:changePageSize", (pageSize) => {
    webview.emit("chat:changePageSize", pageSize);
});
alt.onServer("chat:changeFontSize", (fontSize) => {
    webview.emit("chat:changeFontSize", fontSize);
});
alt.onServer("chat:toggleTimestamp", (toggle) => {
    webview.emit("chat:toggleTimestamp", toggle);
});
alt.onServer("chat:clearMessages", () => {
    clearMessages();
});
alt.onServer("chat:toggleRoleplayMode", () => webview.emit("chat:toggleRoleplayMode"));
export function clearMessages() {
    webview.emit("chat:clearMessages");
}
export function push(text, color = "white", gradient = false, icon = false, roleplay = false) {
    webview.emit("chat:pushMessage", text, color, gradient, icon, roleplay);
}
export function activateChat(state) {
    webview.emit("chat:activateChat", state);
    blockInput(!state);
}
export function isChatActive() {
    return chatActive;
}
export function isInputActive() {
    return inputActive;
}
export function blockInput(block) {
    inputBlocked = block;
}
export function isInputBlocked() {
    return inputBlocked;
}
alt.on("keyup", (key) => {
    if (isInputBlocked())
        return;
    if (chatActive) {
        switch (key) {
            case 33:
                return scrollMessagesList("up");
            case 34:
                return scrollMessagesList("down");
            case 27:
                return activateInput(false, false);
        }
    }
    if (chatActive && inputActive) {
        switch (key) {
            case 13:
                return sendInput();
            case 38:
                return shiftHistoryUp();
            case 40:
                return shiftHistoryDown();
        }
    }
});
alt.on("keydown", (key) => {
    if (isInputBlocked())
        return;
    if (!chatActive) {
        switch (key) {
        }
    }
    if (chatActive && !inputActive) {
        switch (key) {
            case 84:
                activateInput(true);
        }
    }
});
function scrollMessagesList(direction) {
    if (scrollActive)
        return;
    scrollActive = true;
    alt.setTimeout(() => (scrollActive = false), 250 + 5);
    webview.emit("chat:scrollMessagesList", direction);
}
export function activateInput(state, keepPlayerControls = false) {
    webview.emit("chat:activateInput", state, keepPlayerControls);
}
function sendInput() {
    webview.emit("chat:sendInput");
}
function shiftHistoryUp() {
    webview.emit("chat:shiftHistoryUp");
}
function shiftHistoryDown() {
    webview.emit("chat:shiftHistoryDown");
}
