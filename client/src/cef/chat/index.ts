import * as alt from "alt-client";
import { showCursor } from "../Cef";

let chatActive = false;
let inputActive = false;
let scrollActive = false;
let inputBlocked = false;

const webview = new alt.WebView(
  "http://resource/client/cef/chat/html/index.html"
);
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

alt.onServer("chat:changePageSize", (pageSize: number) => {
  webview.emit("chat:changePageSize", pageSize);
});

alt.onServer("chat:changeFontSize", (fontSize: number) => {
  webview.emit("chat:changeFontSize", fontSize);
});

alt.onServer("chat:toggleTimestamp", (toggle: boolean) => {
  webview.emit("chat:toggleTimestamp", toggle);
});

alt.onServer("chat:clearMessages", () => {
  clearMessages();
});

alt.onServer("chat:toggleRoleplayMode", () =>
  webview.emit("chat:toggleRoleplayMode")
);

export function clearMessages() {
  webview.emit("chat:clearMessages");
}

export function push(
  text: string,
  color = "white",
  gradient: boolean | number[] = false,
  icon: boolean | string = false,
  roleplay: boolean = false
) {
  webview.emit("chat:pushMessage", text, color, gradient, icon, roleplay);
}

export function activateChat(state: any) {
  webview.emit("chat:activateChat", state);
  blockInput(!state);
}

export function isChatActive() {
  return chatActive;
}

export function isInputActive() {
  return inputActive;
}

export function blockInput(block: boolean) {
  inputBlocked = block;
}

export function isInputBlocked() {
  return inputBlocked;
}

alt.on("keyup", (key) => {
  if (isInputBlocked()) return;

  // Keys working only when chat is active
  if (chatActive) {
    switch (key) {
      // PageUp
      case 33:
        return scrollMessagesList("up");
      // PageDown
      case 34:
        return scrollMessagesList("down");
      // Escape
      case 27:
        return activateInput(false, false);
    }
  }

  // Keys working only when chat is active and input is active
  if (chatActive && inputActive) {
    switch (key) {
      // Enter
      case 13:
        return sendInput();
      // ArrowUp
      case 38:
        return shiftHistoryUp();
      // ArrowDown
      case 40:
        return shiftHistoryDown();
    }
  }
});

alt.on("keydown", (key) => {
  if (isInputBlocked()) return;

  // Keys working only when chat is not active
  if (!chatActive) {
    switch (key) {
    }
  }

  // Keys working only when chat is active and input is not active
  if (chatActive && !inputActive) {
    switch (key) {
      // Key T
      case 84:
        activateInput(true);
    }
  }
});

function scrollMessagesList(direction: any) {
  if (scrollActive) return;
  scrollActive = true;
  alt.setTimeout(() => (scrollActive = false), 250 + 5);
  webview.emit("chat:scrollMessagesList", direction);
}

export function activateInput(state: any, keepPlayerControls: boolean = false) {
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
